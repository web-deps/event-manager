import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: "eve",
      fileName: (format) => `eve.${format}.js`
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ]
});
