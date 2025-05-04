import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 5174,
    allowedHosts: ["ecommerce-final-project-client.onrender.com"],
  },
});
