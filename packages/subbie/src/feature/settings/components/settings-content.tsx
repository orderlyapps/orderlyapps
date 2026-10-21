import { useEffect, useState } from "react";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { ExportSettingsItem } from "./export-settings-item.tsx";
import { ImportSettingsItem } from "./import-settings-item.tsx";
import { getAppSettings, type SubbiePreferencesSettings } from "../app-settings.ts";
import { ThemeSelector } from "./selectors/theme-selector.tsx";
import { FontSizeSelector } from "./selectors/font-size-selector.tsx";

export function SettingsContent() {
  const [store, setStore] = useState<SubbiePreferencesSettings | null>(null);

  useEffect(() => {
    let active = true;
    void getAppSettings().then((s) => {
      if (active) setStore(s);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <IonList inset>
        <IonItem>
          <IonLabel>Theme</IonLabel>
          <ThemeSelector />
        </IonItem>
        <IonItem>
          <IonLabel>Font size</IonLabel>
          <FontSizeSelector />
        </IonItem>
      </IonList>
      {store && (
        <IonList inset>
          <ExportSettingsItem store={store} fileName="subbie-settings" extension="settings.sub" />
          <ImportSettingsItem store={store} extension="settings.sub" />
        </IonList>
      )}
    </>
  );
}
