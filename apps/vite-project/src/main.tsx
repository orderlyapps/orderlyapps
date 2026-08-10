import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createAppPreferences, initFontSize, initTheme } from "@amodeo/utils";
import { createProclaimerOnboardingSettings } from "@amodeo/proclaimer";
import "./index.css";
import App from "./App.tsx";

const settings = await createAppPreferences({ dbName: "vite-project-preferences" });
await Promise.all([initTheme(settings, { darkClass: "ion-palette-dark" }), initFontSize(settings)]);

const onboardingSettings = await createProclaimerOnboardingSettings({
  dbName: "vite-project-onboarding",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App onboardingSettings={onboardingSettings} />
  </StrictMode>,
);
