# Proclaimer Package — TODO

- [ ] **dts.tsgo vs dts: true** — `packages/proclaimer/vite.config.ts` uses `dts.tsgo` instead of `dts: true`. Confirm if intentional or align with `packages/ui/ionic/vite.config.ts` pattern.
- [ ] **Catalog version consistency** — `@types/node` and `typescript` in `packages/proclaimer/package.json` (and other packages) use direct version specifiers instead of `catalog:`. Update `devDependencies` to use `catalog:` and ensure `pnpm-workspace.yaml` catalog entries match.
- [ ] **Placeholder metadata** — `packages/proclaimer/package.json` (and all other packages: `packages/utils/package.json`, `packages/ui/ionic/package.json`, `tools/config/package.json`) still have placeholder values for `description`, `author`, `homepage`, `bugs.url`, and `repository.url`. Replace with real project metadata.
- [ ] **Missing `<meta charset="UTF-8">` in app `index.html`** — `apps/subbie/index.html` (and `apps/vite-project/index.html`) are missing `<meta charset="UTF-8" />`. The `htmlInject` plugin doesn't inject a charset tag either. Without it, the browser may default to a different encoding, potentially causing rendering issues with non-ASCII characters.
