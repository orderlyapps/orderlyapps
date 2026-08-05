import { useEffect, useState } from "react";
import { IonItem, IonLabel, IonList, IonToggle } from "@ionic/react";
import {
  EmailInput,
  ExportSettingsItem,
  FontSizeSelector,
  ImportSettingsItem,
  NumberInput,
  TextInput,
  ThemeSelector,
} from "@amodeo/ionic";
import type { AppPreferencesSettings } from "@amodeo/utils";
import { appSettings } from "@/app-settings.ts";

export function SettingsContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [store, setStore] = useState<AppPreferencesSettings | null>(null);

  useEffect(() => {
    let active = true;
    void appSettings.then((s) => {
      if (active) setStore(s);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <IonList inset>
        <TextInput
          label="Name"
          labelPlacement="stacked"
          value={name}
          onIonChange={(e) => setName(e.detail.value ?? "")}
        />
        <EmailInput
          label="Email"
          labelPlacement="stacked"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value ?? "")}
        />
        <NumberInput
          label="Age"
          labelPlacement="stacked"
          value={age}
          onIonChange={(e) => setAge(e.detail.value ?? "")}
        />
      </IonList>
      <IonList inset>
        <IonItem>
          <IonLabel>Enable notifications</IonLabel>
          <IonToggle slot="end" />
        </IonItem>
        <IonItem>
          <IonLabel>Theme</IonLabel>
          <ThemeSelector />
        </IonItem>
        <IonItem>
          <IonLabel>Font size</IonLabel>
          <FontSizeSelector />
        </IonItem>
        <IonItem routerLink="/settings/about" detail>
          <IonLabel>About</IonLabel>
        </IonItem>
      </IonList>
      {store && (
        <IonList inset>
          <ExportSettingsItem store={store} fileName="subbie-settings" />
          <ImportSettingsItem store={store} />
        </IonList>
      )}
    </>
  );
}
