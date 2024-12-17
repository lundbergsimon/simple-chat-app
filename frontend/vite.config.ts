import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const port = parseInt(env.VITE_FC_PORT) || 3000;

  return {
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom"
    },
    server: {
      port: port, // Dev port. (has to match container port)
      watch: {
        usePolling: true
      },

      // Use proxy for Docker (NOTE: don't think I need this anymore)
      // proxy: {
      //   '/socket.io': {
      //     target: 'http://localhost:5000', // Backend address
      //     ws: true, // Enable WebSocket proxying
      //   },
      // },
    },
    preview: {
      port: 3000, // port for "npm run preview"
    },
  };
});
