import { defineConfig } from "vite-plus";
import fs from "node:fs";
import path from "node:path";

function svgAssetPlugin() {
  return {
    name: "svg-asset",
    load(this: any, id: string): string | null {
      if (!id.endsWith(".svg")) return null;
      const source = fs.readFileSync(id, "utf-8");
      const relPath = path.relative(process.cwd(), id);
      const ref = this.emitFile({
        type: "asset",
        fileName: relPath.replace(/^src\//, ""),
        source,
      }) as string;
      return `export default import.meta.ROLLUP_FILE_URL_${ref}`;
    },
  };
}

export default defineConfig({
  pack: {
    entry: [
      "src/index.ts",
      "src/database/**/*.ts",
      "src/feature/**/*.ts",
      "src/feature/**/*.tsx",
      "src/ui/**/*.ts",
      "src/ui/**/*.tsx",
    ],
    unbundle: true,
    dts: true,
    // exports map is hand-written in package.json (wildcard + development
    // conditions), so tsdown must not regenerate it
    exports: false,
    plugins: [svgAssetPlugin()],
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
