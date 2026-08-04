import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createAppPreferences, initFontSize } from "@amodeo/utils";
import { initTheme } from "@amodeo/ionic";
import "./index.css";
import App from "./App.tsx";

const settings = await createAppPreferences({ dbName: "subbie-preferences" });
await Promise.all([initTheme(settings), initFontSize(settings)]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
