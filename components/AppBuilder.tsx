
import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  Code, 
  Plus, 
  Type, 
  Image as ImageIcon, 
  List, 
  Bot, 
  Play, 
  Square,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'A', val: 400 },
  { name: 'B', val: 300 },
  { name: 'C', val: 600 },
  { name: 'D', val: 400 },
  { name: 'E', val: 800 },
  { name: 'F', val: 500 },
  { name: 'G', val: 900 },
];

const AppBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Bileşenler' | 'Şablonlar'>('Bileşenler');

  const components = [
    { icon: <Type size={28} />, label: 'Metin Bloğu' },
    { icon: <ImageIcon size={28} />, label: 'Görsel' },
    { icon: <List size={28} />, label: 'Kripto Liste' },
    { icon: <Bot size={28} />, label: 'AI Sohbet Botu' },
    { icon: <Square size={28} />, label: 'Buton' },
    { icon: <Play size={28} />, label: 'Video Oynatıcı' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0f172a] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1e293b]">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">Uygulama Oluşturucu</h2>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
            <LinkIcon size={18} className="text-blue-400" />
            <span className="text-sm font-medium">API</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
            <Code size={18} />
            <span className="text-sm font-medium">Kod Üret</span>
          </button>
        </div>
      </header>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-hidden p-8 flex justify-center">
        <div className="relative w-80 h-[600px] bg-[#1e293b] rounded-[40px] border-[8px] border-slate-800 shadow-2xl overflow-hidden p-6">
          {/* Internal Mobile Content */}
          <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4">Portföyüm Projesi</h3>
            
            <div className="bg-slate-800/50 rounded-2xl p-4 mb-4 border border-blue-500/30 relative">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-xs text-gray-400">Toplam Değer</p>
                  <p className="text-xl font-bold">₺124,500</p>
                </div>
              </div>
              <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              {/* Selection dots mimic the image */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-blue-500" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-blue-500" />
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
              <div className="absolute top-1/2 left-0 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500" />
              <div className="absolute top-1/2 right-0 translate-x-1/2 w-2 h-2 rounded-full bg-blue-500" />
              <div className="absolute top-0 left-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500" />
              <div className="absolute bottom-0 left-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-blue-500" />
            </div>

            <div className="space-y-2">
              {[
                { name: 'Bitcoin', symbol: 'BTC', val: '₺2,100,000', color: 'bg-orange-500' },
                { name: 'Ethereum', symbol: 'ETH', val: '₺120,000', color: 'bg-indigo-500' },
                { name: 'Litecoin', symbol: 'LTC', val: '₺2,200', color: 'bg-teal-500' },
              ].map(coin => (
                <div key={coin.name} className="flex items-center justify-between p-3 bg-slate-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`${coin.color} w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs`}>
                      {coin.symbol[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{coin.name} <span className="text-[10px] text-gray-500">({coin.symbol})</span></p>
                    </div>
                  </div>
                  <p className="text-sm font-bold">{coin.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet UI */}
      <div className="bg-[#1e293b] rounded-t-[32px] p-6 shadow-2xl relative border-t border-white/5">
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-6">Bileşen Ekle</h3>
        
        <div className="flex border-b border-white/10 mb-6">
          <button 
            onClick={() => setActiveTab('Bileşenler')}
            className={`px-8 py-3 text-lg font-medium border-b-2 transition-colors ${activeTab === 'Bileşenler' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500'}`}
          >
            Bileşenler
          </button>
          <button 
            onClick={() => setActiveTab('Şablonlar')}
            className={`px-8 py-3 text-lg font-medium border-b-2 transition-colors ${activeTab === 'Şablonlar' ? 'border-transparent text-gray-500' : 'border-transparent'}`}
          >
            Şablonlar
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {components.map((comp) => (
            <button key={comp.label} className="bg-slate-800/50 hover:bg-slate-800 p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-2 transition-colors">
              <div className="text-gray-400">{comp.icon}</div>
              <span className="text-xs text-center text-gray-300">{comp.label}</span>
            </button>
          ))}
          
          <button className="col-span-2 bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            <Sparkles size={24} className="text-white" />
            <span className="font-bold">AI Asistan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppBuilder;
