import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setupIonic } from "@amodeo/ionic";
import "./index.css";
import App from "./App.tsx";

setupIonic();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
