import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.PORT}`, // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api from path
      },
    },
  },
});
