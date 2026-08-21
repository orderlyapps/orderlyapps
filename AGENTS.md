<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## Route / Page Folder Structure

All page components live under `src/routes`. Each route is a kebab-case folder
containing an `index.tsx` (the page component). Nested routes are nested folders.
A page may optionally have a `_components/` folder for its private sub-components;
those sub-components are themselves kept in kebab-case subfolders. The leading
underscore marks the folder as non-route (it is ignored by the router).

```
src/
└── routes/
    ├── dashboard/
    │   ├── index.tsx                          # /dashboard
    │   ├── reports/
    │   │   ├── index.tsx                      # /dashboard/reports
    │   │   ├── quarterly/
    │   │   │   ├── index.tsx                  # /dashboard/reports/quarterly
    │   │   │   ├── summary/
    │   │   │   │   └── index.tsx              # /dashboard/reports/quarterly/summary
    │   │   │   └── _components/
    │   │   │       └── report-chart/
    │   │   │           └── report-chart.tsx
    │   │   └── _components/
    │   │       └── report-table/
    │   │           └── report-table.tsx
    │   └── _components/
    │       └── dashboard-header/
    │           └── dashboard-header.tsx
    ├── settings/
    │   ├── index.tsx                          # /settings
    │   ├── account/
    │   │   └── index.tsx                      # /settings/account
    │   └── _components/
    │       └── settings-nav/
    │           └── settings-nav.tsx
    └── users/
        ├── index.tsx                          # /users
        └── profile/
            └── index.tsx                      # /users/profile
```

### Rules

- One route = one folder. The folder name is the URL segment, in kebab-case.
- The page component is always `index.tsx` inside that folder.
- Nested routes are nested folders (the path mirrors the URL).
- A page's private components live in a `_components/` folder **inside that
  page's folder**. Each component gets its own kebab-case subfolder containing
  the component file (e.g. `_components/report-chart/report-chart.tsx`). The
  leading underscore marks the folder as non-route so the router ignores it.
- Shared/cross-page components do not belong here — place them in a top-level
  `src/components` folder instead.
