import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { getAppSettings } from "@amodeo/subbie";
import "./index.css";
import App from "./App.tsx";

await getAppSettings();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
