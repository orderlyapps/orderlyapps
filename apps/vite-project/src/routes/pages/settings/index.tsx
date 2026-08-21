import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { EmailInput, FontSizeSelector, NumberInput, TextInput, ThemeSelector } from "@amodeo/ionic";
import { ResetOnboardingButton } from "@amodeo/proclaimer";

export default function SettingsTabPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
        <IonList inset>
          <IonItem lines="none">
            <ResetOnboardingButton />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
