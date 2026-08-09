# Proclaimer Package — TODO

- [ ] **Placeholder metadata** — `packages/proclaimer/package.json` (and all other packages: `packages/utils/package.json`, `packages/ui/ionic/package.json`, `tools/config/package.json`) still have placeholder values for `description`, `author`, `homepage`, `bugs.url`, and `repository.url`. Replace with real project metadata.

- [ ] **`@journeyapps/wa-sqlite` build script ignored** — every `vp add`/`vp install` exits 1 with `ERR_PNPM_IGNORED_BUILDS: Ignored build scripts: @journeyapps/wa-sqlite@1.7.2`. `pnpm-workspace.yaml` has a placeholder `allowBuilds` entry for it (`set this to true or false`). Decide whether the wa-sqlite build script should run (it's the SQLite WASM build used by `@tanstack/browser-db-sqlite-persistence`) and either approve it via `pnpm approve-builds` or explicitly set it to `false`, so installs stop exiting non-zero.
