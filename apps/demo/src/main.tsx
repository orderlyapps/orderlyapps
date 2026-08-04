import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createAppPreferences, initFontSize } from "@amodeo/utils";
import { initTheme } from "@amodeo/ionic";
import { App } from "./app";

const settings = await createAppPreferences({ dbName: "demo-preferences" });
await Promise.all([initTheme(settings), initFontSize(settings)]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
