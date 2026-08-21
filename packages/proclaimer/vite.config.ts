import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["src/index.ts", "src/database/**/*.ts", "src/feature/**/*.ts"],
    unbundle: true,
    dts: true,
    // exports map is hand-written in package.json (wildcard + development
    // conditions), so tsdown must not regenerate it
    exports: false,
  },
  test: {
    environment: "happy-dom",
    setupFiles: ["./tests/setup.ts"],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
