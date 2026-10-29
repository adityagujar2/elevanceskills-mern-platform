import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this repository under /<repository-name>/.
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? "/elevanceskills-mern-platform/" : "/",
  server: {
    port: 5173,
    strictPort: true
  }
});
