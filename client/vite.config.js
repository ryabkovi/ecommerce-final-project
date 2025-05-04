import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  appType: "spa",
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 5173,
    allowedHosts: ["ecommerce-final-project-dashboard.onrender.com"],
  },
});
