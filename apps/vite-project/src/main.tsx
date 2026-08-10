import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createAppDatabase, createAppPreferences, initFontSize, initTheme } from "@amodeo/utils";
import { createProclaimerOnboardingSettings } from "@amodeo/proclaimer";
import "./index.css";
import App from "./App.tsx";

const database = await createAppDatabase({ name: "vite-project" });

const settings = await createAppPreferences({ database });
await Promise.all([initTheme(settings, { darkClass: "ion-palette-dark" }), initFontSize(settings)]);

const onboardingSettings = await createProclaimerOnboardingSettings({ database });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App onboardingSettings={onboardingSettings} />
  </StrictMode>,
);
