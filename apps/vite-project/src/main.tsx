import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createAppPreferences } from "@amodeo/utils";
import "./index.css";
import App from "./App.tsx";

await createAppPreferences({ darkClass: "ion-palette-dark" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
