import type { UserConfig } from "vite-plus";
import { vitePWA } from "../plugins/vitePWA.ts";
import { reactPlugins } from "../plugins/react.ts";

if (!reactPlugins) {
  throw new Error("reactPlugins failed to initialize from lazyPlugins()");
}

export const reactAppDefaults: UserConfig = {
  lint: {
    plugins: ["react", "typescript", "oxc"],
    rules: {
      "react/rules-of-hooks": "error",
      "react/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
  },
  plugins: [...vitePWA, ...reactPlugins],
};
