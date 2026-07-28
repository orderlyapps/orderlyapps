import { defineConfig } from "vite-plus";
import { reactAppDefaults } from "config";

// https://vite.dev/config/
export default defineConfig({
  ...reactAppDefaults({
    name: "Vite Project",
    short_name: "ViteProject",
    description: "A Vite project with PWA support",
    theme_color: "#ffffff",
    background_color: "#ffffff",
  }),
});
