
import React, { useState, useRef } from 'react';
import { Volume2, Play, Loader2, Pause, Speaker } from 'lucide-react';
import { aiService } from '../services/geminiService';

const AIVoiceGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voice, setVoice] = useState('Kore');
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const decodeAudio = async (base64: string) => {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = audioContextRef.current;
    const dataInt16 = new Int16Array(bytes.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  };

  const handleGenerateAndPlay = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const base64 = await aiService.textToSpeech(text, voice);
      const buffer = await decodeAudio(base64);
      
      if (sourceNodeRef.current) sourceNodeRef.current.stop();
      
      const source = audioContextRef.current!.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current!.destination);
      source.onended = () => setIsPlaying(false);
      
      source.start();
      sourceNodeRef.current = source;
      setIsPlaying(true);
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
          <Volume2 className="text-orange-600" />
          AI Ses Sentezleyici
        </h1>
        <p className="text-gray-500">Google TTS teknolojisiyle metinlerini profesyonel sese dönüştür.</p>
      </header>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="mb-6 flex gap-4">
          {['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'].map((v) => (
            <button
              key={v}
              onClick={() => setVoice(v)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                voice === v ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Seslendirilmesini istediğin metni buraya yaz..."
          className="w-full h-48 p-6 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-orange-500 outline-none text-lg resize-none mb-6"
        />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-400">
            <Speaker size={20} />
            <span className="text-sm">24kHz PCM Audio</span>
          </div>
          <button
            onClick={handleGenerateAndPlay}
            disabled={loading || !text.trim()}
            className="flex items-center gap-3 bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-700 disabled:opacity-50 transition-all shadow-lg shadow-orange-200"
          >
            {loading ? <Loader2 className="animate-spin" /> : isPlaying ? <Pause /> : <Play />}
            {isPlaying ? 'Oynatılıyor...' : 'Sesi Oluştur ve Oynat'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIVoiceGenerator;
