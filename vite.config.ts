import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Cambia este puerto por el puerto de tu servidor backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Esto elimina `/api` de la solicitud
      },
    },
  },
});
