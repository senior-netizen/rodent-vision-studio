import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const hasLocalModule = (moduleName: string) =>
  fs.existsSync(path.resolve(__dirname, "node_modules", moduleName));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ...(hasLocalModule("three")
        ? {}
        : { three: path.resolve(__dirname, "./src/vendor/three-lite") }),
      ...(hasLocalModule("gsap") ? {} : { gsap: path.resolve(__dirname, "./src/vendor/gsap-lite") }),
      ...(hasLocalModule("lenis")
        ? {}
        : { lenis: path.resolve(__dirname, "./src/vendor/lenis-lite") }),
    },
  },
}));
