import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { fileURLToPath } from "node:url";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
    resolve: {
        alias: {
            "@src": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
