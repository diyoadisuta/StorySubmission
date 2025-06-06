import { defineConfig } from "vite";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "src", "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, "src/index.html"),
    //     sw: resolve(__dirname, "src/scripts/sw.js"),
    //   },
    //   output: {
    //     entryFileNames: (chunkInfo) => {
    //       return chunkInfo.name === "sw" ? "sw.js" : "assets/[name]-[hash].js";
    //     },
    //     manualChunks(id) {
    //       if (id.includes("sw.js")) {
    //         return "sw";
    //       }
    //     },
    //   },
    // },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "false",
      strategies: "injectManifest",
      srcDir: "scripts",
      filename: "sw.js",
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        id: "/StorySubmission/#/",
        start_url: "/StorySubmission/#/",
        name: "Story App",
        short_name: "StoryApp",
        description: "Aplikasi Cerita",
        theme_color: "#ffffff",
        icons: [
          {
            src: "images/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        screenshots: [
          {
            src: "images/screenshots/YourCrito_Screenshot001.png",
            sizes: "1903x913",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "images/screenshots/YourCrito_Screenshot002.png",
            sizes: "1902x913",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "images/screenshots/YourCrito_Screenshot003.png",
            sizes: "1902x913",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "images/screenshots/YourCrito_Screenshot004.png",
            sizes: "840x1676",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
});
