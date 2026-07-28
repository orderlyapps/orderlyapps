import { defineConfig } from "vite-plus";
import { reactAppDefaults } from "config";

const APP_NAME = "Vite Project";

// https://vite.dev/config/
export default defineConfig({
  ...reactAppDefaults({
    pwaOptions: {
      name: APP_NAME,
      short_name: APP_NAME,
      description: "A Vite project with PWA support",
      theme_color: "#4a6da7",
      background_color: "#1de04e",
    },
    htmlOptions: {
      title: APP_NAME,
      themeColor: "#4a6da7",
    },
  }),
});
