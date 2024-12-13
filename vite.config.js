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
});
