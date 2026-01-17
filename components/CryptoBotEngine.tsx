
import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { 
  Settings, 
  ChevronRight,
  X,
  Save,
  AlertTriangle
} from 'lucide-react';

const chartData = [
  { name: '1', val: 30 },
  { name: '2', val: 50 },
  { name: '3', val: 40 },
  { name: '4', val: 65 },
  { name: '5', val: 55 },
  { name: '6', val: 80 },
  { name: '7', val: 70 },
  { name: '8', val: 95 },
];

const indicators = [
  "SMA", "EMA", "WMA", "VWAP",
  "TEMA", "DEMA", "HMA", "ZLEMA",
  "RSI", "StochRSI", "MACD", "CCI",
  "ADX", "ROC", "MOM", "AO",
  "W%R", "BBANDS", "ATR", "KC",
  "DC", "OBV", "VMA", "CMF",
  "FI", "MFI", "MFI", "Ichimoku",
  "SAR", "HA", "Pivot", "Supertrend"
];

const CryptoBotEngine: React.FC = () => {
  const [selectedIndicator, setSelectedIndicator] = useState('SMA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [botSettings, setBotSettings] = useState({
    tradingPair: 'BTC/USDT',
    strategyType: 'Trend Following',
    leverage: 5,
    stopLoss: 2,
    takeProfit: 10,
    isActive: true
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8 bg-[#f8fafc] animate-fadeIn relative">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Kripto Bot Motoru</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-gray-700 font-medium"
        >
          <Settings size={18} />
          Bot Ayarları
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">İndikatör Seçimi ve Ayarları</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {indicators.map(ind => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndicator(ind)}
                  className={`py-3 text-xs font-bold rounded-xl border transition-all ${
                    selectedIndicator === ind 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                      : 'bg-white text-gray-600 border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-8 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Strateji Oluşturma</h2>
            <div className="space-y-2">
              {["Yeni Strateji", "Mevcut Stratejiler", "Alım Koşulları", "Satım Koşulları"].map(item => (
                <button key={item} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                  <span className="font-semibold text-gray-700">{item}</span>
                  <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Bot Performansı ve Durumu</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 mb-1">Aktif Botlar:</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 mb-1">Son 24 Saat Kâr:</p>
                <p className="text-2xl font-bold text-green-600">+%4.5</p>
              </div>
            </div>

            <div className="h-24 w-full mb-6 bg-gray-50 rounded-2xl border border-gray-100 p-2 overflow-hidden">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <Area type="monotone" dataKey="val" stroke="#22c55e" strokeWidth={3} fill="#dcfce7" />
                  </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {[
                { bot: 'BTC-USDT Trend Bot', status: 'Çalışıyor', color: 'text-green-600', coin: 'BTC', coinColor: 'bg-orange-500' },
                { bot: 'ETH-USDT Scalp', status: 'Çalışıyor', color: 'text-green-600', coin: 'ETH', coinColor: 'bg-indigo-600' },
                { bot: 'SOL-USDT Arbitraj', status: 'Beklemede', color: 'text-orange-500', coin: 'SOL', coinColor: 'bg-slate-800' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`${item.coinColor} w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold`}>
                      {item.coin}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.bot}</p>
                      <p className={`text-xs font-medium ${item.color}`}>({item.status})</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-slideUp">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Settings size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Bot Parametreleri</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">İşlem Çifti</label>
                  <select 
                    value={botSettings.tradingPair}
                    onChange={(e) => setBotSettings({...botSettings, tradingPair: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  >
                    <option>BTC/USDT</option>
                    <option>ETH/USDT</option>
                    <option>SOL/USDT</option>
                    <option>BNB/USDT</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Strateji Tipi</label>
                  <select 
                    value={botSettings.strategyType}
                    onChange={(e) => setBotSettings({...botSettings, strategyType: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  >
                    <option>Trend Following</option>
                    <option>Scalping</option>
                    <option>Grid Trading</option>
                    <option>Arbitrage</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-700">Kaldıraç (x{botSettings.leverage})</label>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">Orta Risk</span>
                </div>
                <input 
                  type="range" min="1" max="100" 
                  value={botSettings.leverage}
                  onChange={(e) => setBotSettings({...botSettings, leverage: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Stop Loss (%)</label>
                  <input 
                    type="number" 
                    value={botSettings.stopLoss}
                    onChange={(e) => setBotSettings({...botSettings, stopLoss: parseFloat(e.target.value)})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Take Profit (%)</label>
                  <input 
                    type="number" 
                    value={botSettings.takeProfit}
                    onChange={(e) => setBotSettings({...botSettings, takeProfit: parseFloat(e.target.value)})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3">
                <AlertTriangle className="text-orange-500 shrink-0" size={20} />
                <p className="text-xs text-orange-700 leading-relaxed font-medium">
                  Dikkat: Kaldıraçlı işlemler yüksek risk içerir. Stop-loss limitlerinizi belirlerken volatiliteyi göz önünde bulundurun.
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                >
                  İptal
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Ayarları Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoBotEngine;
