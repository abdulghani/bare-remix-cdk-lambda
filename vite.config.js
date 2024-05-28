import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./@"),
    },
  },
  plugins: [
    remix({
      buildDirectory: "build",
      serverBuildFile: "index.js",
      ssr: true,
    }),
  ],
});
