import { defineConfig } from "vite-plus";
import { reactPlugins } from "@amodeo/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: reactPlugins ?? [],
});
