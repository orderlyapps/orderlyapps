import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFontSize, initTheme } from "@amodeo/utils";
import { appSettings } from "./app-settings.ts";
import "./index.css";
import App from "./App.tsx";

const settings = await appSettings;
await Promise.all([initTheme(settings, { darkClass: "ion-palette-dark" }), initFontSize(settings)]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
