import { defineConfig } from "vite-plus";
import { libraryDefaults } from "@amodeo/config";

export default defineConfig({
  ...libraryDefaults,
  pack: {
    dts: {
      tsgo: true,
    },
    exports: true,
  },
});
