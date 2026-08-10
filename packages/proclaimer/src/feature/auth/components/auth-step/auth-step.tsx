import { useState } from "react";
import { IonButton, IonItem, IonLabel, IonList, IonSegment, IonSegmentButton } from "@ionic/react";
import type { PublisherRecord } from "../../../publishers/publisher-schema.js";
import { formatPublisherName } from "../../../publishers/components/publisher-name/publisher-name.js";
import { PasswordForm } from "./components/password-form/password-form.js";
import { OtpForm } from "./components/otp-form/otp-form.js";

export interface AuthStepProps {
  publisher: PublisherRecord;
  onSuccess: () => void;
  onBack: () => void;
}

export function AuthStep({ publisher, onSuccess, onBack }: AuthStepProps) {
  const [mode, setMode] = useState<"password" | "otp">("password");
  const email = `${publisher.id}@proclaimer.app`;

  return (
    <>
      <IonList inset>
        <IonItem lines="none">
          <IonLabel>
            <h2>{formatPublisherName(publisher)}</h2>
            <p>Sign in to continue</p>
          </IonLabel>
        </IonItem>
      </IonList>
      <IonSegment
        value={mode}
        onIonChange={(e) => {
          const v = e.detail.value;
          if (v === "password" || v === "otp") setMode(v);
        }}
      >
        <IonSegmentButton value="password">
          <IonLabel>Password</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="otp">
          <IonLabel>Code</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      {mode === "password" ? (
        <PasswordForm email={email} onSuccess={onSuccess} />
      ) : (
        <OtpForm email={email} onSuccess={onSuccess} />
      )}
      <div className="ion-padding">
        <IonButton expand="block" fill="clear" onClick={onBack}>
          Back
        </IonButton>
      </div>
    </>
  );
}
