
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';
import AppBuilder from './components/AppBuilder';
import CryptoBotEngine from './components/CryptoBotEngine';
import AIImageGenerator from './components/AIImageGenerator';
import AISearchGrounding from './components/AISearchGrounding';
import AIVoiceGenerator from './components/AIVoiceGenerator';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <MainDashboard onNavigate={setCurrentView} />;
      case 'APP_BUILDER':
        return <AppBuilder />;
      case 'CRYPTO_BOT':
        return <CryptoBotEngine />;
      case 'AI_IMAGE':
        return <AIImageGenerator />;
      case 'AI_SEARCH':
        return <AISearchGrounding />;
      case 'AI_VOICE':
        return <AIVoiceGenerator />;
      default:
        return (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Bu Bölüm Hazırlanıyor</h2>
              <p className="text-gray-500 mb-6">{currentView} modülü yakında aktif edilecek.</p>
              <button 
                onClick={() => setCurrentView('DASHBOARD')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Geri Dön
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f4f7fe] text-gray-800 overflow-hidden font-sans">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
