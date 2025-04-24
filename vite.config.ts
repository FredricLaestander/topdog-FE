import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        list: resolve(__dirname, "list.html"),
        createList: resolve(__dirname, "create-list.html"),
        logIn: resolve(__dirname, "log-in.html"),
        signUp: resolve(__dirname, "sign-up.html"),
      },
    },
  },
});
