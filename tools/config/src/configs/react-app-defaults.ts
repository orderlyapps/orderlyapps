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
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react",
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 30,
            },
            {
              name: "ionic",
              test: /node_modules[\\/](@ionic|ionicons|@stencil)[\\/]/,
              priority: 20,
            },
            {
              name: "supabase",
              test: /node_modules[\\/]@supabase[\\/]/,
              priority: 10,
            },
            {
              name: "tanstack",
              test: /node_modules[\\/]@tanstack[\\/]/,
              priority: 10,
            },
            {
              name: "vendor",
              test: /node_modules[\\/]/,
            },
          ],
        },
      },
    },
  },
  lint: {
    ignorePatterns: ["public/vendor/**"],
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
