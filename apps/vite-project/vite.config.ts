import path from "node:path";
import { defineConfig } from "vite-plus";
import { reactAppDefaults } from "@amodeo/config";

const APP_NAME = "Vite project";
const THEME_COLOR = "#4a6da7";
const BACKGROUND_COLOR = "#4a6da7";
const THEME_COLOR_LIGHT = "#4a6da7";
const THEME_COLOR_DARK = "#1a2332";

// https://vite.dev/config/
export default defineConfig(
  reactAppDefaults({
    pwaOptions: {
      name: APP_NAME,
      short_name: APP_NAME,
      description: "A Vite project with PWA support",
      theme_color: THEME_COLOR,
      background_color: BACKGROUND_COLOR,
    },
    htmlOptions: {
      title: APP_NAME,
      splashColor: THEME_COLOR,
      themeColorLight: THEME_COLOR_LIGHT,
      themeColorDark: THEME_COLOR_DARK,
    },
    srcDir: path.resolve(__dirname, "src"),
  }),
);
