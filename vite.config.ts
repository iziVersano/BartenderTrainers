// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 👈 Allows external access (for Replit public URL)
    port: 5173       // 👈 Matches the default Vite port
  }
});
