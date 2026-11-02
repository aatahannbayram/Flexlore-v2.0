# Flexlore Ortak Deploy (preprod2a4)

## Mimari (özet)
GitHub `aatahannbayram/Flexlore-v2.0` → (push: `main` veya `mikel-coffee`) → GitHub Actions `Deploy preprod2a4`
→ `npm ci` + `npm run build` (Next.js static export → `out/`) → `out.tgz`
→ SSH `flexlore-deploy@72.60.84.196` (yalnız anahtar, **forced command**)
→ sunucuda `sudo /usr/local/bin/flexlore-publish`: tgz'yi `/var/www/preprod2a4.new`'e açar, `index.html` kontrolü, symlink temizliği, `root:root` sahiplik → **atomik dizin değişimi** → eski dizin silinir (ek yedek tutulmaz; disk dostu)
→ nginx (Let's Encrypt, `X-Robots-Tag: noindex, nofollow` nginx konfigürasyonunda; deploy dokunmaz) → https://preprod2a4.flexlore.com
→ Actions health check: `/` ve `/demo/mikel-coffee/` için 200 + noindex.

## Deploy kullanıcısı
- Host: `72.60.84.196` · Kullanıcı: `flexlore-deploy` · Hedef: `/var/www/preprod2a4`
- Parola kilitli (`passwd -l`), yalnızca SSH anahtarı.
- Her anahtar `restrict,command="sudo /usr/local/bin/flexlore-publish"` ile kısıtlı: shell, port forwarding, PTY, agent yok. Hangi komut yazılırsa yazılsın yalnızca publish scripti çalışır.
- sudoers (`/etc/sudoers.d/flexlore-deploy`): yalnızca `/usr/local/bin/flexlore-publish`, NOPASSWD. Root parolası kimseyle paylaşılmaz.
- Eşzamanlı deploy kilidi (`flock`), log: `/var/log/flexlore-deploy.log`.
- Boş/bozuk arşiv gelirse swap yapılmaz, canlı site etkilenmez.

## Takım arkadaşı nasıl deploy eder (manuel)
```bash
npm ci && npm run build
tar -C out -czf out.tgz .
ssh -i ~/.ssh/<kendi_anahtarı> flexlore-deploy@72.60.84.196 < out.tgz
# çıktı: "deployed N files at ..."
curl -sI https://preprod2a4.flexlore.com/ | grep -iE "^HTTP|robots"
```
Not: rsync/scp desteklenmez (bilerek); tek yol stdin'den tgz. VPS'te port 22 bazen ilk denemede zaman aşımına uğruyor, tekrar deneyin.

## Takım arkadaşının anahtarını ekleme (önerilen: herkes kendi anahtarı)
1. Arkadaş: `ssh-keygen -t ed25519 -C "isim@flexlore"` → `~/.ssh/id_ed25519.pub` içeriğini Ata'ya gönderir (yalnız **.pub**).
2. Ata / yetkili (root ile):
```bash
echo 'restrict,command="sudo /usr/local/bin/flexlore-publish" ssh-ed25519 AAAA... isim@flexlore' \
  | ssh root@72.60.84.196 'cat >> /home/flexlore-deploy/.ssh/authorized_keys'
```
3. Kaldırma: ilgili satırı `authorized_keys`'ten silin.
Özel anahtar (private key) asla paylaşılmaz.

## Mevcut anahtarlar
- `flexlore-deploy@box` — Grok Bot box'ı, özel anahtar: box `~/.ssh/flexlore-deploy`
- `flexlore-ci@github-actions` — GitHub Actions, özel anahtar: box `~/.ssh/flexlore-ci` + repo secret `DEPLOY_KEY`

## GitHub Actions
- Dosya: `.github/workflows/deploy-preprod.yml`
- Tetik: `main` ve `mikel-coffee` push'ları + elle `workflow_dispatch` (Actions → Deploy preprod2a4 → Run workflow).
- Aynı anda tek deploy (concurrency).

### Secrets checklist (Settings → Secrets and variables → Actions) — kuruldu
| Secret | Değer |
|---|---|
| `DEPLOY_HOST` | `72.60.84.196` |
| `DEPLOY_USER` | `flexlore-deploy` |
| `DEPLOY_KEY` | CI özel anahtarı (`flexlore-ci`) |
| `DEPLOY_KNOWN_HOSTS` | VPS host anahtarları (StrictHostKeyChecking=yes) |

## Kurallar
- Sadece `/var/www/preprod2a4`; diğer siteler, DNS, Vercel'e dokunulmaz.
- noindex kaldırılmaz. Fiyat / uydurma metrik yayınlanmaz.
- CI anahtarı sızarsa: authorized_keys'teki `flexlore-ci` satırını silin, yeni anahtar üretip `DEPLOY_KEY`'i güncelleyin.
