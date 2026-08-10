import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  test: {
    projects: ["packages/proclaimer", "packages/utils", "packages/ui/*", "tools/*"],
  },
  lint: {
    ignorePatterns: ["**/public/vendor/**"],
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
