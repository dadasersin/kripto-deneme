
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  server: {
    port: 3000
  },
  build: {
    // Render.com varsayılan olarak 'build' klasörünü bekler.
    outDir: 'build',
    // Parça boyutu uyarısını devre dışı bırakmak için limiti yükseltiyoruz.
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'recharts', 'lucide-react', '@google/genai'],
        },
      },
    },
  },
});
