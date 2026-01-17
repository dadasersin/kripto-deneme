
import React, { useState } from 'react';
import { Sparkles, Download, Loader2, Send, AlertCircle } from 'lucide-react';
import { aiService } from '../services/geminiService';

const AIImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImage(null);
    
    try {
      const result = await aiService.generateImage(prompt);
      setImage(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Görsel oluşturulurken bir sorun çıktı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Sparkles className="text-purple-600" />
          AI Görsel Oluşturucu
        </h1>
        <p className="text-gray-500">Google Gemini 2.5 Flash Image ile hayallerini gerçeğe dönüştür.</p>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col gap-6">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ne hayal ediyorsun? (Örn: Neon ışıklı fütüristik bir İstanbul manzarası, yağmurlu bir gece...)"
            className="w-full h-32 p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-purple-500 focus:bg-white transition-all outline-none resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="absolute bottom-4 right-4 bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-200"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <div className="min-h-[400px] rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
          {loading ? (
            <div className="text-center">
              <Loader2 className="animate-spin mx-auto text-purple-600 mb-4" size={48} />
              <p className="text-gray-500 font-medium">Sanat eserin hazırlanıyor...</p>
            </div>
          ) : image ? (
            <div className="relative group w-full h-full flex justify-center">
              <img src={image} alt="AI Generated" className="max-h-[600px] object-contain shadow-2xl animate-scaleIn" />
              <a 
                href={image} 
                download="ai-generated.png"
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2 text-xs font-bold text-gray-700"
              >
                <Download size={16} />
                İndir
              </a>
            </div>
          ) : (
            <div className="text-center p-8">
              <Sparkles size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400">Henüz bir görsel üretilmedi. Bir şeyler yaz ve başla!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIImageGenerator;
