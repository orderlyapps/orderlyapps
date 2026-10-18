import path from "node:path";
import fs from "node:fs";
import { loadEnv, defineConfig, type PluginOption } from "vite-plus";
import { reactAppDefaults } from "@amodeo/config";

const APP_NAME = "Proclaimer";

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
function serveOpfsWorker(): PluginOption {
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

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Resolve env relative to this config file, not cwd, so theme values are
  // still found if the config is loaded from another directory.
  const env = loadEnv(mode, import.meta.dirname, "VITE_");

  const base = reactAppDefaults({
    pwaOptions: {
      name: APP_NAME,
      short_name: APP_NAME,
      description: "Proclaimer app",
      theme_color: env.VITE_THEME_COLOR || "#00ffff",
      background_color: env.VITE_BACKGROUND_COLOR || "#ffffff",
      manifest: {
        orientation: "portrait",
        scope: "/",
      },
      workbox: {
        disableDevLogs: true,
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2,jpg}"],
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
            urlPattern: /^https:\/\/api\.mapbox\.com\/sprites\/.*/,
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
    },
    htmlOptions: {
      title: APP_NAME,
      splashColor: env.VITE_BACKGROUND_COLOR || "#ffffff",
      themeColorLight: env.VITE_THEME_COLOR_LIGHT || "#DDD",
      themeColorDark: env.VITE_THEME_COLOR_DARK || "#272727",
    },
    srcDir: path.resolve(import.meta.dirname, "src"),
  });

  return {
    ...base,
    resolve: {
      alias: {
        ...(base.resolve?.alias as Record<string, string>),
        "@shared": path.resolve(import.meta.dirname, "./src/shared"),
        "@util": path.resolve(import.meta.dirname, "./src/util"),
        "@proclaimer-content": path.resolve(import.meta.dirname, "./src/content"),
        "@proclaimer-routes": path.resolve(import.meta.dirname, "./src/routes"),
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
    plugins: [...(base.plugins ?? []), serveOpfsWorker()],
  };
});
