import type { PluginOption } from "vite-plus";
import { lazyPlugins } from "vite-plus";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export const reactPlugins: PluginOption[] | undefined = lazyPlugins(() => [
  react(),
  babel({ presets: [reactCompilerPreset()] }),
]);
