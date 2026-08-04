import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createAppPreferences, initFontSize, initTheme } from "@amodeo/utils";
import { App } from "./app";

const settings = await createAppPreferences({ dbName: "demo-preferences" });
await Promise.all([initTheme(settings, { darkClass: "ion-palette-dark" }), initFontSize(settings)]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
