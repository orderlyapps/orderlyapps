import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { appSettings } from "./app-settings.ts";
import "./index.css";
import App from "./App.tsx";

await appSettings;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
