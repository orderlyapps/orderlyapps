import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  test: {
    projects: ["packages/*", "tools/*"],
  },
  lint: {
    ignorePatterns: ["**/public/vendor/**"],
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
