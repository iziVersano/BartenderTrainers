import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@assets": path.resolve(__dirname, "attached_assets"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: "client",
  server: {
    host: true,
    strictPort: true,
    allowedHosts: [
      "8a8e2c8a-5ccf-4dcb-8455-7b38dac6f748-00-1g6jxrhljre5g.kirk.replit.dev", // Replace with your actual domain if it changed
    ],
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
