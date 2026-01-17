
import React, { useState } from 'react';
import { Search, Globe, Loader2, ExternalLink } from 'lucide-react';
import { aiService } from '../services/geminiService';

const AISearchGrounding: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ text: string, sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await aiService.searchWithGrounding(query);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Globe className="text-blue-600" />
          AI Bilgi & Araştırma
        </h1>
        <p className="text-gray-500">Google Arama destekli gerçek zamanlı ve doğrulanmış bilgiler.</p>
      </header>

      <div className="flex flex-col gap-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Hangi konuda bilgi almak istersin? (Örn: Paris Olimpiyatları madalya sıralaması...)"
              className="w-full p-4 pl-12 bg-white rounded-2xl border-2 border-gray-100 focus:border-blue-500 outline-none shadow-sm transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="bg-blue-600 text-white px-8 rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-200"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Ara'}
          </button>
        </div>

        {loading ? (
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
            <p className="text-gray-500 font-medium italic">Google'da aranıyor ve analiz ediliyor...</p>
          </div>
        ) : result && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 prose prose-blue max-w-none">
              <p className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">{result.text}</p>
            </div>

            {result.sources.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Kaynaklar</h3>
                <div className="flex flex-wrap gap-2">
                  {result.sources.map((chunk: any, i: number) => (
                    chunk.web && (
                      <a
                        key={i}
                        href={chunk.web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-blue-600 hover:border-blue-500 transition-colors"
                      >
                        <ExternalLink size={12} />
                        {chunk.web.title || 'Kaynak'}
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISearchGrounding;
