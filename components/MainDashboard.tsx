
import React from 'react';
import { 
  Smartphone, 
  Monitor, 
  Rocket, 
  Image, 
  Headphones, 
  UserCircle 
} from 'lucide-react';
import { ViewState } from '../types';

interface MainDashboardProps {
  onNavigate: (view: ViewState) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ onNavigate }) => {
  const stats = [
    { label: 'Oluşturulan Uygulama', value: '25', color: 'bg-blue-500' },
    { label: 'Aktif Bot', value: '5', color: 'bg-sky-400' },
    { label: 'Medya Dosyası İşlendi', value: '1,200', color: 'bg-purple-600' },
  ];

  const modules = [
    { 
      id: 'APP_BUILDER', 
      title: 'Uygulama Oluşturucu', 
      desc: 'Hızlı uygulama geliştirme', 
      icon: <Smartphone size={32} />, 
      color: 'bg-blue-500' 
    },
    { 
      id: 'SITE_DESIGN', 
      title: 'Site Tasarım Modülü', 
      desc: 'Web sitesi tasarla', 
      icon: <Monitor size={32} />, 
      color: 'bg-indigo-500' 
    },
    { 
      id: 'CRYPTO_BOT', 
      title: 'Kripto Bot Motoru', 
      desc: 'Otomatik ticaret botu', 
      icon: <Rocket size={32} />, 
      color: 'bg-orange-500' 
    },
    { 
      id: 'MEDIA', 
      title: 'Medya İşleme Modülü', 
      desc: 'Görsel, ses düzenle', 
      icon: <Image size={32} />, 
      color: 'bg-red-500' 
    },
    { 
      id: 'REQUESTS', 
      title: 'İstek ve Talep Yönetimi', 
      desc: 'Destek ve geri bildirim', 
      icon: <Headphones size={32} />, 
      color: 'bg-teal-600' 
    },
    { 
      id: 'SETTINGS', 
      title: 'Kullanıcı Paneli', 
      desc: 'Hesap ve ayarlar', 
      icon: <UserCircle size={32} />, 
      color: 'bg-green-500' 
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fadeIn">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Ana Kontrol Paneli</h1>
        <p className="text-xl text-gray-500">Yapay Zeka Destekli Modüler Platform</p>
      </header>

      <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Platform İstatistikleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className={`${stat.color} p-6 rounded-2xl text-white shadow-lg`}>
              <div className="text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <button
            key={mod.title}
            onClick={() => onNavigate(mod.id as ViewState)}
            className={`${mod.color} p-6 rounded-3xl text-white text-left flex items-start gap-6 shadow-xl hover:scale-[1.02] transition-transform group`}
          >
            <div className="p-3 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-colors">
              {mod.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{mod.title}</h3>
              <p className="text-white/80 font-medium">{mod.desc}</p>
            </div>
          </button>
        ))}
      </section>
    </div>
  );
};

export default MainDashboard;
