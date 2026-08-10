import { useState } from "react";
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import type { CongregationRecord } from "../../../../../congregations/congregation-schema.js";

export interface PasswordStepProps {
  congregation: CongregationRecord;
  onSuccess: () => void;
  onBack: () => void;
}

export function PasswordStep({ congregation, onSuccess, onBack }: PasswordStepProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!congregation.password || password === congregation.password) {
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <IonList inset>
        <IonItem lines="none">
          <IonLabel>
            <h2>{congregation.name}</h2>
            <p>Enter the congregation password</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonInput
            label="Password"
            labelPlacement="stacked"
            type="password"
            value={password}
            onIonInput={(e) => {
              setPassword(e.detail.value ?? "");
              setError(false);
            }}
          />
        </IonItem>
        {error && (
          <IonItem lines="none">
            <IonNote color="danger">Incorrect password</IonNote>
          </IonItem>
        )}
      </IonList>
      <div className="ion-padding">
        <IonButton expand="block" onClick={handleSubmit}>
          Continue
        </IonButton>
        <IonButton expand="block" fill="clear" onClick={onBack}>
          Back
        </IonButton>
      </div>
    </>
  );
}
