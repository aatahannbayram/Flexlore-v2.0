# Flexlore Teklif ve ROI Standardı (Demo Sayfası Yaklaşımı)

> Referans uygulama: Mikel Coffee demo sayfası — https://preprod2a4.flexlore.com/demo/mikel-coffee/ (noindex, özel pitch sayfası).
> Bu doküman, her yeni müşteri demosu / teklif anlatısı / ROI sunumu için bağlayıcı standarttır.

## 1. Konumlandırma: Operatör gözünden simülasyon
- Flexlore'u "bir yazılım" olarak değil, müşterinin sahadaki çalışanının (barista, kasiyer, teknisyen) ekranda gördüğü şeyin **simülasyonu** olarak anlat.
- Ziyaretçi telefon mockup'ında gerçek akışı görür: içecek seç → video adımlar → quiz → yönetici tablosu.
- Mesaj: "Yeni gelen biri ilk vardiyasında ustası gibi çalışır."

## 2. Ana anlatı sütunları
1. **COPQ (Cost of Poor Quality):** Hatalı ürün, israf, yeniden yapım, müşteri kaybı, denetim cezası. Rakam vermeden önce mekanizmayı göster; rakamları yalnızca ROI bölümünde örnek varsayım olarak kullan.
2. **Onboarding:** Yeni personelin üretken hale gelme süresi; videolu SOP + quiz ile kısaltılması.
3. **Usta–çırak modeli:** Ustanın bilgisi bir kez kaydedilir (Flexlore video editörü: Adım başı / Adım sonu / Adımı tamamla), tüm şubelere dağıtılır.
4. **Franchise standardizasyonu:** Hero başlığı kalıbı: **"Her franchise'ta, aynı standart."** — "standart" turuncu, şık tipografi. Ürün örnekleri (ör. Freddo) yalnızca problem bölümünde örnek olarak geçer; hero'da ürün adı/slogan oyunu kullanılmaz ("Freddo ne? Standart olsun." gibi satırlar yok).

## 3. Demo sayfası yapısı (sıra)
1. Hero: müşteri logosu (yalnızca özel pitch sayfasında, hukuken uygunsa) + "Müşteri için hazırlanmış demo" etiketi (turuncu) + standart başlığı + sinematik video.
2. Problem: sahadaki tutarsızlık, tek somut örnek (ör. Freddo farklı şubede farklı), turuncu tik satırları.
3. 01 · Reçeteler / SOP'lar video adımlar halinde (her adım için ayrı klip; aynı klip tekrar etmez).
4. Video editörü: ustanın tek çekimi adımlara bölmesi (filmstrip, Start/Stop/Duration, İptal kırmızı / Tamamla turuncu, Çıkartma/Metin/Adımlar).
5. 02 · Açılış, kapanış ve poli (temizlik/hijyen listeleri, backflush, buhar çubuğu, tezgâh, imza).
6. Hijyen / alerjen bölümü, quiz.
7. Yönetici tablosu: Türkçe gerçekçi isimler (Ayşe K., Mehmet Y., Elif D., Can A., Zeynep S.) — "Barista 1" yok.
8. ROI hesaplayıcı (bkz. §5).
9. CTA: resmî TR App Store / Google Play rozetleri.

## 4. Görsel kurallar
- Kurumsal turuncu **#ff6a1a** (etiketler, vurgular, aktif durumlar).
- Koyu, sinematik tema; **yeşil kullanılmaz**.
- Telefon mockup'larında Flexlore fav (app-icon) şık biçimde chrome'da.
- "AI gibi" görünmeyen, gerçekçi görseller; AI üretimi klipler dahili olarak işaretlenir.
- Müşteri logosu yalnızca noindex özel pitch sayfasında.

## 5. ROI modeli
- Girdi: **Türkiye asgari ücreti** (2026: brüt 33.030 ₺, işveren maliyeti 40.874,63 ₺, 225 saat/ay; kaynak: ÇSGB duyurusu, ÇSGB işveren maliyeti bülteni, Resmî Gazete 26.12.2025/33119).
- Ölçek varsayımı: **100+ şube × şube başı 6 personel** — **ÖRNEK planlama varsayımıdır, müşteri verisi değildir**; sayfada açıkça etiketlenir.
- Kazanç kalemleri: onboarding saat tasarrufu, usta zamanı, hata/israf azalması — tümü kullanıcı tarafından değiştirilebilir slider'lar.
- Uydurma metrik, vaka sonucu veya müşteri iddiası **yazılmaz**.

## 6. Fiyatlandırma
- Flexlore fiyatı demo sayfasında ve ilk raporda **verilmez**; follow-up görüşmesine bırakılır.

## 7. Teslimat paketi
1. Demo sayfası (preprod).
2. **Notion raporu:** dijital dönüşüm analizi, COPQ, onboarding, ROI varsayımları (örnek olarak etiketli), sonraki adımlar.
3. **Kibar follow-up e-postası** (Asistan hazırlar/gönderir; imza: Ata Han Bayram, Co-Founder & CEO, Flexlore Inc.).

## 8. Teknik / yayın
- Ortam: **preprod2a4.flexlore.com**, `/var/www/preprod2a4` (VPS), `X-Robots-Tag: noindex, nofollow` zorunlu.
- Repo: aatahannbayram/Flexlore-v2.0; Next.js static export.
- Diğer site, domain, DNS, Vercel'e dokunulmaz; VPS'te yedek yok → minimum değişiklik, atomik dizin değişimi.
- Her deploy sonrası curl ile 200 + noindex doğrulaması ve ekran görüntüleri.

## 9. Kırmızı çizgiler
- Uydurma iddia / metrik yok; tahminler "örnek" etiketli.
- Fiyat yok.
- Yeşil yok; noindex kaldırılmaz.
- Müşteri logosu yalnızca özel sayfada ve hukuken uygunsa.
