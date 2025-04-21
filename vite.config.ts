import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'date-utils': ['date-fns'],
          'ui-components': ['lucide-react', 'react-hot-toast']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js', 'date-fns'],
  },
});
