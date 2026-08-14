import { defineConfig, loadEnv } from "vite-plus";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "node:path";
import fs from "node:fs";
import { VitePWA } from "vite-plugin-pwa";

/**
 * Vite plugin that serves the @tanstack/browser-db-sqlite-persistence OPFS
 * worker file during dev. The package creates its worker via
 * `new URL("../assets/opfs-worker-*.js", import.meta.url)`. When the package
 * is excluded from dep pre-bundling, Vite serves its ESM via /@fs/ and rewrites
 * the worker URL to an /@fs/ path — but Vite's /@fs/ middleware only serves
 * files that are part of the module graph, so the worker file (loaded via
 * `new Worker(url)`, not an import) gets a 403. This plugin intercepts the
 * worker file request and serves it directly from disk.
 */
function serveOpfsWorker(): import("vite").Plugin {
  const workerFilePattern = "/@tanstack/browser-db-sqlite-persistence/dist/assets/opfs-worker-";
  return {
    name: "serve-opfs-worker",
    configureServer(server) {
      // Middleware added in configureServer's body runs BEFORE Vite's
      // internal /@fs/ middleware, so we can intercept the worker file
      // request before Vite rejects it with 403.
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? "";
        if (!url.includes(workerFilePattern)) return next();
        // Strip query string and decode the /@fs/ path
        const cleanUrl = url.split("?")[0];
        const fsPath = cleanUrl.replace(/^\/@fs\//, "/");
        const filePath = decodeURIComponent(fsPath);
        if (!fs.existsSync(filePath)) {
          console.warn(`[serve-opfs-worker] file not found: ${filePath}`);
          return next();
        }
        const content = fs.readFileSync(filePath);
        res.setHeader("Content-Type", "text/javascript");
        res.writeHead(200);
        res.end(content);
      });
    },
  };
}

// Load env vars for the proclaimer mode (.env, .env.proclaimer)
const env = loadEnv("proclaimer", import.meta.dirname, "");

// https://vite.dev/config/
export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    plugins: ["oxc", "typescript", "unicorn", "react"],
    categories: {
      correctness: "warn",
    },
    env: {
      builtin: true,
    },
    ignorePatterns: ["dist", "example-code"],
    overrides: [
      {
        files: ["vite.config.ts"],
        env: {
          node: true,
        },
      },
      {
        files: ["**/*.{ts,tsx}"],
        rules: {
          "constructor-super": "error",
          "for-direction": "error",
          "getter-return": "error",
          "no-async-promise-executor": "error",
          "no-case-declarations": "error",
          "no-class-assign": "error",
          "no-compare-neg-zero": "error",
          "no-cond-assign": "error",
          "no-const-assign": "error",
          "no-constant-binary-expression": "error",
          "no-constant-condition": "error",
          "no-control-regex": "error",
          "no-debugger": "error",
          "no-delete-var": "error",
          "no-dupe-class-members": "error",
          "no-dupe-else-if": "error",
          "no-dupe-keys": "error",
          "no-duplicate-case": "error",
          "no-empty": "error",
          "no-empty-character-class": "error",
          "no-empty-pattern": "error",
          "no-empty-static-block": "error",
          "no-ex-assign": "error",
          "no-extra-boolean-cast": "error",
          "no-fallthrough": "error",
          "no-func-assign": "error",
          "no-global-assign": "error",
          "no-import-assign": "error",
          "no-invalid-regexp": "error",
          "no-irregular-whitespace": "error",
          "no-loss-of-precision": "error",
          "no-misleading-character-class": "error",
          "no-new-native-nonconstructor": "error",
          "no-nonoctal-decimal-escape": "error",
          "no-obj-calls": "error",
          "no-prototype-builtins": "error",
          "no-redeclare": "error",
          "no-regex-spaces": "error",
          "no-self-assign": "error",
          "no-setter-return": "error",
          "no-shadow-restricted-names": "error",
          "no-sparse-arrays": "error",
          "no-this-before-super": "error",
          "no-unassigned-vars": "error",
          "no-undef": "error",
          "no-unexpected-multiline": "error",
          "no-unreachable": "error",
          "no-unsafe-finally": "error",
          "no-unsafe-negation": "error",
          "no-unsafe-optional-chaining": "error",
          "no-unused-labels": "error",
          "no-unused-private-class-members": "error",
          "no-unused-vars": "error",
          "no-useless-assignment": "error",
          "no-useless-backreference": "error",
          "no-useless-catch": "error",
          "no-useless-escape": "error",
          "no-with": "error",
          "preserve-caught-error": "error",
          "require-yield": "error",
          "use-isnan": "error",
          "valid-typeof": "error",
          "no-array-constructor": "error",
          "no-unused-expressions": "error",
          "typescript/ban-ts-comment": "error",
          "typescript/no-duplicate-enum-values": "error",
          "typescript/no-empty-object-type": "error",
          "typescript/no-explicit-any": "error",
          "typescript/no-extra-non-null-assertion": "error",
          "typescript/no-misused-new": "error",
          "typescript/no-namespace": "error",
          "typescript/no-non-null-asserted-optional-chain": "error",
          "typescript/no-require-imports": "error",
          "typescript/no-this-alias": "error",
          "typescript/no-unnecessary-type-constraint": "error",
          "typescript/no-unsafe-declaration-merging": "error",
          "typescript/no-unsafe-function-type": "error",
          "typescript/no-wrapper-object-types": "error",
          "typescript/prefer-as-const": "error",
          "typescript/prefer-namespace-keyword": "error",
          "typescript/triple-slash-reference": "error",
          "react/rules-of-hooks": "error",
          "react/exhaustive-deps": "warn",
          "react/only-export-components": [
            "error",
            {
              allowConstantExport: true,
            },
          ],
        },
        env: {
          browser: true,
        },
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  envDir: import.meta.dirname,
  server: {
    fs: {
      allow: [
        import.meta.dirname,
        // The linked @amodeo/proclaimer workspace package (consumed from dist)
        path.resolve(import.meta.dirname, "../../packages/proclaimer"),
      ],
    },
  },
  resolve: {
    alias: {
      "@shared": path.resolve(import.meta.dirname, "./src/shared"),
      "@ui": path.resolve(import.meta.dirname, "./src/ui"),
      "@util": path.resolve(import.meta.dirname, "./src/util"),
      "@proclaimer-content": path.resolve(import.meta.dirname, "./src/content"),
      "@proclaimer-routes": path.resolve(import.meta.dirname, "./src/routes"),
      "@proclaimer-shared": path.resolve(import.meta.dirname, "./src/apps/proclaimer/shared"),
    },
  },
  optimizeDeps: {
    // Exclude browser-db-sqlite-persistence from pre-bundling so Vite serves
    // its ESM files directly. The package creates an OPFS Web Worker via
    // `new URL("../assets/opfs-worker-*.js", import.meta.url)`. When
    // pre-bundled, import.meta.url points at /node_modules/.vite/deps/ and the
    // resolved worker URL falls outside the dev server root, triggering the
    // SPA fallback (index.html) instead of the JS file — which causes the
    // worker to terminate immediately with "OPFS worker terminated
    // unexpectedly". Serving the package as native ESM lets Vite's middleware
    // resolve the worker URL correctly.
    exclude: ["@tanstack/browser-db-sqlite-persistence"],
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    serveOpfsWorker(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: env.VITE_PWA_NAME || "Wiz Bang",
        short_name: env.VITE_PWA_SHORT_NAME || "Wiz Bang",
        description: env.VITE_PWA_DESCRIPTION || "Wiz Bang app",
        theme_color: env.VITE_PWA_THEME_COLOR || "#3880ff",
        background_color: env.VITE_PWA_BACKGROUND_COLOR || "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/assets/pwa/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/assets/pwa/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        disableDevLogs: true,
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2,jpg}"],
        globIgnores: ["**/assets/pwa/**"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        navigateFallback: "index.html",
        navigateFallbackAllowlist: [/^\//],
        runtimeCaching: [
          {
            urlPattern: /\/api\/.*/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/[a-z]\.tiles\.mapbox\.com\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "mapbox-tiles",
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/api\.mapbox\.com\/v4\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "mapbox-tiles",
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/api\.mapbox\.com\/styles\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "mapbox-styles",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/api\.mapbox\.com\/fonts\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "mapbox-fonts",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days — fonts are immutable
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/api\.mapbox\.com\/(sprites|v4)\/.*/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "mapbox-assets",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
