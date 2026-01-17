
import React from 'react';
import { 
  Home, 
  Smartphone, 
  Rocket, 
  Settings, 
  Menu,
  ChevronLeft,
  Sparkles,
  Search,
  Volume2
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, onToggle }) => {
  const navItems = [
    { id: 'DASHBOARD' as ViewState, label: 'Ana Sayfa', icon: <Home size={22} /> },
    { id: 'APP_BUILDER' as ViewState, label: 'Uygulama', icon: <Smartphone size={22} /> },
    { id: 'CRYPTO_BOT' as ViewState, label: 'Kripto Bot', icon: <Rocket size={22} /> },
    { type: 'divider', label: 'GOOGLE AI LABS' },
    { id: 'AI_IMAGE' as ViewState, label: 'AI Görsel', icon: <Sparkles size={22} /> },
    { id: 'AI_SEARCH' as ViewState, label: 'AI Araştırma', icon: <Search size={22} /> },
    { id: 'AI_VOICE' as ViewState, label: 'AI Ses', icon: <Volume2 size={22} /> },
    { type: 'divider', label: 'SİSTEM' },
    { id: 'SETTINGS' as ViewState, label: 'Ayarlar', icon: <Settings size={22} /> },
  ];

  return (
    <aside className={`bg-[#202124] text-white flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden font-bold">
            G
          </div>
          {isOpen && <span className="font-semibold text-sm">AI Platform</span>}
        </div>
        <button onClick={onToggle} className="text-gray-400 hover:text-white transition-colors">
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item: any, idx) => (
          item.type === 'divider' ? (
            isOpen && <div key={`divider-${idx}`} className="px-4 pt-4 pb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</div>
          ) : (
            <button
              key={item.label}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id 
                  ? 'bg-white/10 text-white font-medium' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isOpen && <span className="text-sm whitespace-nowrap">{item.label}</span>}
            </button>
          )
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className={`p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl ${isOpen ? 'block' : 'hidden'}`}>
          <p className="text-xs font-bold text-white/80 uppercase mb-1">GOOGLE POWERED</p>
          <p className="text-sm font-medium mb-3">En yeni Gemini modelleri aktif.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
