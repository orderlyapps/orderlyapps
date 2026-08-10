import path from "node:path";
import { loadEnv, defineConfig } from "vite-plus";
import { reactAppDefaults } from "@amodeo/config";

const APP_NAME = "Subbie";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const THEME_COLOR = env.VITE_THEME_COLOR;
  const BACKGROUND_COLOR = env.VITE_BACKGROUND_COLOR;
  const THEME_COLOR_LIGHT = env.VITE_THEME_COLOR_LIGHT;
  const THEME_COLOR_DARK = env.VITE_THEME_COLOR_DARK;

  return reactAppDefaults({
    pwaOptions: {
      name: APP_NAME,
      short_name: APP_NAME,
      description: "A Subbie project with PWA support",
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
  });
});
