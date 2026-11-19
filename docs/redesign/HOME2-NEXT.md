# home2 ve Sana tarzı butonlar: kaldığımız yer (2026-11-19)

## Karar (Ata, 2026-11-19)
Önce **A**: yeni buton, form ve segment tepsisi stili tek başına canlıya çıkar, ana sayfa olduğu gibi kalır.
Yaklaşık bir hafta sonra **B**: home2 ana sayfa olur (/ ve /tr/).

## Durum
- Dal `feat/trust-turkiye`. İlgili commit'ler:
  - a98aa93: Sana tarzı butonlar, alanlar, segment tepsisi ve /home2 (deneme, noindex)
  - 81a53f3: home2 hareketleri (framer-motion girişleri, büyüyen fotoğraf çerçevesi, yükselen telefon, yüzen kartlar, sekmeli fotoğraf slider'ı)
  - dbdba41: slider sekmeleri 48 px (çerçeve %92 ölçekteyken de 44 px+)
- Playwright: 1017/1017 geçti (`BASE_URL=http://localhost:4322 npx playwright test`, ~15 dk).
- Kaydırma kontrolü yapıldı: /tr/home2/ ve /home2/, 1440 ve 390 px. Taşma yok, konsol hatası yok, slider 5 sn'de geçiyor.
- Karşılaştırma sayfası: https://claude.ai/artifact/Ma1xYyjgRWVW3x49Gmpgmc

## A için yapılacaklar (canlıya alma)
1. Yalnızca buton/form/segment stilini içeren bir sürüm hazırla. home2 rotası noindex kalabilir ya da çıkarılabilir, ana sayfa bileşeni değişmez.
2. Tam test takımı + formu gerçek klavyeyle yazarak dene (fiyat formu, destek formu).
3. Ata'dan açık "yayına al" onayı al, sonra deploy tarifiyle (release worktree, `FLX_LAUNCH=1 npm run build`, html.prev yedek) yayınla, ardından `node scripts/indexnow.mjs`.

## B için yapılacaklar (home2 ana sayfa)
- Kelime 645'ten 445'e iniyor: title/description, H1, SEO metni ve canonical kontrolü.
- noindex'i kaldır, / ve /tr/ altına taşı, hreflang ve sitemap'i güncelle.
- İngilizce "Manufacturing" slaytındaki kart: "Sent to the kitchen team" yerine üretime uygun ifade (ör. "line team").
