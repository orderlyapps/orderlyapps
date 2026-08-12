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

  // Example Vite configuration to enable required headers

  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },

  // Application code: Handle the failure gracefully
  // try {
  //   const database = await openDatabaseWithRetry();
  // } catch (error) {
  //   console.error("Falling back to in-memory storage:", error);
  //   // Initialize your DB without OPFS persistence here
  // }
});
