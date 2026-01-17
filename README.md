
# AI Modüler Platform (Vite & Gemini)

Bu proje artık daha hızlı ve güvenilir olan **Vite** altyapısını kullanmaktadır.

## 🚀 Render.com Üzerinde Güncel Yayınlama Adımları

Render panelinde (`dashboard.render.com`) mevcut sitenizin ayarlarına girin veya yeni bir **Static Site** oluşturun:

1. **Build Command:** `npm install && npm run build`
2. **Publish Directory:** `dist` (Önceden `build` idi, Vite ile `dist` oldu. **Bunu mutlaka değiştirin!**)
3. **Environment Variables:**
   - `API_KEY` değişkeninin doğru şekilde tanımlandığından emin olun.
4. **Redirects/Rewrites:**
   - `/* -> /index.html (Rewrite)` kuralının aktif olduğundan emin olun.

## 🛠 Değişiklik Nedeni
Önceki yapıda kullanılan `react-scripts` paketi, dosyaların `src/` klasörü içinde olmasını zorunlu kılıyordu. Vite ise kök dizindeki dosyalarla sorunsuz çalışır ve Render üzerinde hata vermez.
