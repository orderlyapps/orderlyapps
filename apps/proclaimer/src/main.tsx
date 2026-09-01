import "./init-database";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@util/vendor/ionic/helper/ionic-init";
import "@amodeo/proclaimer/ui/css/index.css";
import "@util/vendor/ionic/css/index.css";
import { initTheme } from "@amodeo/proclaimer/util/theme";
import { initFontSize } from "@amodeo/proclaimer/util/font-size";
import { QueryProvider } from "@util/vendor/react-query";
import { PwaUpdateToast } from "@util/app/pwa/PwaUpdateToast";
import { runMigration } from "@util/app/migration/migrate";
import App from "./App";

initTheme();
initFontSize();

// Run migration from previous app version
const migrationResult = runMigration();
if (migrationResult.congregationMigrated || migrationResult.publisherMigrated) {
  console.log("Migration completed:", migrationResult);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <IonApp>
        <IonReactRouter>
          <App />
        </IonReactRouter>
        <PwaUpdateToast />
      </IonApp>
    </QueryProvider>
  </StrictMode>,
);
