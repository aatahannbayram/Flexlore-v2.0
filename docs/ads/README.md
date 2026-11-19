# Google Ads: hazır kampanya dosyaları (FLE-226)

Bütçe onaylanınca Google Ads Editor ile içe aktarılır. Her şey **Paused** durumundadır; içe aktarmak para harcatmaz.

| Dosya | İçerik |
| -- | -- |
| campaigns.csv | 3 arama kampanyası: Brand (US+TR), Category US, Category TR |
| keywords.csv | 12 reklam grubu, her kelime Exact + Phrase, reklamın gideceği sayfayla birlikte |
| negatives.csv | Kampanya düzeyinde negatif kelimeler (Brand'de `login` hariç) |
| ads.csv | Her reklam grubu için bir responsive search ad (12 başlık, 4 açıklama) |

Notlar:

- Bütçeler TRY/gün cinsinden yer tutucu değerlerdir (hesap para birimi TRY). Gerçek bütçe FLE-128'de belirlenecek.
- Başlıklar en fazla 30, açıklamalar en fazla 90 karakterdir. Bu sınırlar script tarafından kontrol edildi.
- Reklam metinleri kampanya planı §1'e uyar: "#1", "best" ifadeleri, rakip adları, dil sayısı, program logoları ve uyum iddiaları yok.
- `/tr/demo/` canlıda 404 verdiği için TR reklamları `/tr/` ve `/tr/sektor/*` sayfalarına gider.
- İçe aktarmadan önce dönüşüm takibi kurulmalıdır: GA4'teki `lead_sent` ve `demo_click` key event'leri Google Ads'e aktarılacak.
