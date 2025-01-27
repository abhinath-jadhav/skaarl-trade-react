import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  root: "./",
  resolve: {
    alias: {
      // Polyfill global object
      global: "global",
    },
    // Provide fallback for Node.js built-ins
    fallback: {
      global: "globalThis",
    },
  },
  build: {
    outDir: "dist",
  },
  publicDir: "public",
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8765", // Your backend URL
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove '/api' prefix if needed
  //     },
  //   },
  // },
});
