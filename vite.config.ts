import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.REACT_APP_API_USERNAME || "";
const password = process.env.REACT_APP_API_PASSWORD || "";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.assignments-ailabs.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        auth: `${username}:${password}`,
      },
    },
  },
});
