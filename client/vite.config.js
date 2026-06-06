import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config — proxies /api to the Express backend during dev
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://github-repo-explorer-roq0.onrender.com',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
