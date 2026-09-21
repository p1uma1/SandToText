import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "./src/index.js",
            name: "Sand2Text",

            formats: ["es", "umd"],

            fileName: (format) => {
                if (format === "es") {
                    return "sand2text.es.js";
                }

                return "sand2text.umd.js";
            }
        }
    }
});