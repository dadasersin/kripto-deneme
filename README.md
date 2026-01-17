
# AI Modüler Platform (Gemini Powered)

Bu proje, Google'ın en gelişmiş yapay zeka modellerini (Gemini 3, Gemini 2.5 Flash Image, TTS) tek bir çatı altında toplayan, modüler bir uygulama ve bot yönetim platformudur.

## ✨ Özellikler

- 📱 **Uygulama Oluşturucu:** Sürükle-bırak mantığına yakın, AI destekli mobil uygulama prototipleme arayüzü.
- 📈 **Kripto Bot Motoru:** Gelişmiş indikatör seçimi (SMA, RSI, MACD vb.) ve risk yönetimi paneli içeren işlem botu simülasyonu.
- 🎨 **AI Görsel Laboratuvarı:** Gemini 2.5 Flash Image kullanarak metinden yüksek kaliteli görseller üretme.
- 🌐 **AI Bilgi & Araştırma:** Google Arama (Search Grounding) desteği ile güncel ve doğrulanmış bilgi sorgulama.
- 🎙️ **AI Ses Sentezleyici:** Metinleri doğal insan sesine (TTS) dönüştüren gelişmiş ses modülü.
- 🌗 **Modern UI:** Tailwind CSS ve Lucide-React ikonları ile zenginleştirilmiş, responsive tasarım.

## 🛠️ Teknoloji Yığını

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS
- **AI Integration:** @google/genai (Gemini API)
- **Icons:** Lucide-React
- **Charts:** Recharts

## 🚀 Kurulum ve Çalıştırma

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/kullaniciadi/ai-moduler-platform.git
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. API anahtarınızı `.env` dosyasına ekleyin (veya platformun sağladığı ortam değişkenini kullanın):
   ```env
   API_KEY=YOUR_GEMINI_API_KEY
   ```
4. Uygulamayı başlatın:
   ```bash
   npm start
   ```

## ⚠️ Önemli Notlar

- Bu uygulama **Gemini 2.5** ve **Gemini 3** serisi modelleri kullanmaktadır.
- Görsel oluşturma ve ses sentezi özellikleri için API anahtarınızın bu modellere erişimi olmalıdır.
- Platformdaki kripto botu bir simülasyondur, gerçek finansal işlemler için kullanılması önerilmez.

## 📄 Lisans

MIT License - Detaylar için `LICENSE` dosyasına bakınız.
