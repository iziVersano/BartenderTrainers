import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/client/src',
      '@assets': '/attached_assets',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  root: 'client',
});
