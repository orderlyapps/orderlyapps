# Proclaimer Package — TODO

- [ ] **Placeholder metadata** — `packages/proclaimer/package.json` (and all other packages: `packages/utils/package.json`, `packages/ui/ionic/package.json`, `tools/config/package.json`) still have placeholder values for `description`, `author`, `homepage`, `bugs.url`, and `repository.url`. Replace with real project metadata.
- [ ] **Outdated test name** — `packages/utils/tests/settings-transfer.test.ts` test "import with replace clears existing values first" should be renamed to reflect the `replaceAll` semantics (e.g. "import with replace replaces existing values").
