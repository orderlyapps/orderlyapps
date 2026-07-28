import type { UserConfig } from "vite-plus";
import { vitePWA, type VitePWAOptions } from "../plugins/vitePWA.ts";
import { htmlInject, type HtmlInjectOptions } from "../plugins/htmlInject.ts";
import { reactPlugins } from "../plugins/react.ts";

export const reactAppDefaults = ({
  pwaOptions,
  htmlOptions,
}: {
  pwaOptions: VitePWAOptions;
  htmlOptions: HtmlInjectOptions;
}): UserConfig => ({
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
  plugins: [...vitePWA(pwaOptions), ...htmlInject(htmlOptions), ...(reactPlugins ?? [])],
});
