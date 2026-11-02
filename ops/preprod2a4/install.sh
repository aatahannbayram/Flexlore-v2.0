#!/bin/bash
# install.sh: preprod2a4 ortak deploy kurulumunu sunucuya kurar ya da günceller.
# Root olarak çalışır, tekrar tekrar çalıştırılabilir. Mevcut anahtarlara, nginx'e ve site içeriğine dokunmaz.
#
# Mac'ten (repo kökünde, root anahtarıyla):
#   tar -C ops/preprod2a4 -cz . | ssh root@72.60.84.196 'd=$(mktemp -d) && tar -xz -C "$d" && bash "$d/install.sh"; rc=$?; rm -rf "$d"; exit $rc'
set -euo pipefail
cd "$(dirname "$0")"

readonly USER_NAME=flexlore-deploy
readonly SSHD_SNIPPET=/etc/ssh/sshd_config.d/60-flexlore-deploy.conf
readonly LOG=/var/log/flexlore-deploy.log

[ "$(id -u)" -eq 0 ] || { echo "root olarak çalıştırın" >&2; exit 1; }
for c in flock setpriv tar gzip sudo sshd visudo ssh-keygen; do
  command -v "$c" >/dev/null || { echo "eksik araç: $c" >&2; exit 1; }
done
command -v exch >/dev/null || command -v python3 >/dev/null || { echo "atomik değişim için exch ya da python3 gerekli" >&2; exit 1; }
grep -Eq '^[[:space:]]*Include[[:space:]]+/etc/ssh/sshd_config\.d/\*\.conf' /etc/ssh/sshd_config \
  || { echo "sshd_config, sshd_config.d/*.conf dosyalarını içermiyor; elle bakılmalı" >&2; exit 1; }

# 1) Kullanıcı: şifre kilitli, yalnızca anahtar. Forced command'in çalışması için gerçek bir shell gerekir.
if ! id "$USER_NAME" >/dev/null 2>&1; then
  useradd --create-home --shell /bin/sh --comment "Flexlore preprod2a4 deploy" "$USER_NAME"
  echo "kullanıcı oluşturuldu: $USER_NAME"
fi
case "$(getent passwd "$USER_NAME" | cut -d: -f7)" in
  */nologin|*/false) usermod --shell /bin/sh "$USER_NAME" ;;
esac
passwd -l "$USER_NAME" >/dev/null

# 2) Ev dizini ve anahtarlar root sahipli: kullanıcı yalnızca okur, kendi authorized_keys dosyasını değiştiremez.
home=$(getent passwd "$USER_NAME" | cut -d: -f6)
chown root:"$USER_NAME" "$home" && chmod 0750 "$home"
install -d -m 0750 -o root -g "$USER_NAME" "$home/.ssh"
[ -e "$home/.ssh/authorized_keys" ] || : > "$home/.ssh/authorized_keys"
chown root:"$USER_NAME" "$home/.ssh/authorized_keys" && chmod 0640 "$home/.ssh/authorized_keys"

# 3) Yayın scripti
bash -n flexlore-publish
install -m 0755 -o root -g root flexlore-publish /usr/local/bin/flexlore-publish

# 4) sudoers: önce doğrula, sonra yerleştir
visudo -cf sudoers.flexlore-deploy >/dev/null
install -m 0440 -o root -g root sudoers.flexlore-deploy /etc/sudoers.d/flexlore-deploy
visudo -c >/dev/null

# 5) Log ve logrotate (mevcut log korunur)
[ -e "$LOG" ] || install -m 0640 -o root -g adm /dev/null "$LOG"
chown root:adm "$LOG" && chmod 0640 "$LOG"
install -m 0644 -o root -g root logrotate.flexlore-deploy /etc/logrotate.d/flexlore-deploy

# 6) sshd: flexlore-deploy için Match bloğu. root'un etkin ayarı değişirse geri alınır.
root_cfg() { sshd -T -C user=root,host=localhost,addr=127.0.0.1 | sort | sha256sum; }
before=$(root_cfg)
backup=""
[ ! -e "$SSHD_SNIPPET" ] || { backup=$(mktemp); cp -p "$SSHD_SNIPPET" "$backup"; }
install -m 0644 -o root -g root sshd.flexlore-deploy.conf "$SSHD_SNIPPET"
restore() {
  if [ -n "$backup" ]; then cp -p "$backup" "$SSHD_SNIPPET"; else rm -f "$SSHD_SNIPPET"; fi
  echo "sshd ayarı geri alındı: $1" >&2
  exit 1
}
sshd -t || restore "sshd -t hata verdi"
[ "$(root_cfg)" = "$before" ] || restore "root için etkin sshd ayarı değişecekti"
effective=$(sshd -T -C user="$USER_NAME",host=localhost,addr=127.0.0.1)
grep -qix 'forcecommand sudo /usr/local/bin/flexlore-publish' <<< "$effective" || restore "ForceCommand etkin değil"
[ -z "$backup" ] || rm -f "$backup"
if systemctl is-active --quiet ssh 2>/dev/null; then
  systemctl reload ssh
elif systemctl is-active --quiet sshd 2>/dev/null; then
  systemctl reload sshd
fi

# 7) Anahtar satırları: kısıtsız satır varsa uyar (ForceCommand yine de korur)
while IFS= read -r line; do
  case "$line" in
    '' | '#'*) ;;
    'restrict,command="sudo /usr/local/bin/flexlore-publish" '*) ;;
    *) echo "UYARI: kısıtsız anahtar satırı: ${line:0:50}..." >&2 ;;
  esac
done < "$home/.ssh/authorized_keys"

echo "kurulum tamam: $(grep -c '^restrict,command=' "$home/.ssh/authorized_keys" || true) anahtar kayıtlı"
