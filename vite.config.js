import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    remix({
      buildDirectory: "build",
      serverBuildFile: "index.js",
      ssr: true,
    }),
  ],
});
