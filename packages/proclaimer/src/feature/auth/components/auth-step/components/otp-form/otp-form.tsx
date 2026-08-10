import { useState } from "react";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { describeSupabaseError } from "@amodeo/utils/supabase";
import { getErrorMessage } from "@amodeo/utils/errors";
import { useSupabase } from "../../../../../../providers/supabase-context.js";

export interface OtpFormProps {
  email: string;
  onSuccess: () => void | Promise<void>;
}

export function OtpForm({ email, onSuccess }: OtpFormProps) {
  const supabase = useSupabase();
  const [phase, setPhase] = useState<"request" | "verify">("request");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({ email });
      if (otpError) {
        setError(describeSupabaseError(otpError));
      } else {
        setPhase("verify");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });
      if (verifyError) {
        setError(describeSupabaseError(verifyError));
      } else {
        await onSuccess();
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (phase === "request") {
    return (
      <>
        <IonList inset>
          <IonItem lines="none">
            <IonLabel>
              <p>
                Tap below to request a sign-in code. Contact your congregation admin to receive it.
              </p>
            </IonLabel>
          </IonItem>
          {error && (
            <IonItem lines="none">
              <IonNote color="danger">{error}</IonNote>
            </IonItem>
          )}
        </IonList>
        <div className="ion-padding">
          <IonButton expand="block" onClick={handleRequest} disabled={loading}>
            {loading ? <IonSpinner /> : "Request Code"}
          </IonButton>
        </div>
      </>
    );
  }

  return (
    <>
      <IonList inset>
        <IonItem lines="none">
          <IonText color="medium">
            <p>A code has been sent. Contact your admin to get it.</p>
          </IonText>
        </IonItem>
        <IonItem>
          <IonInput
            label="Code"
            labelPlacement="stacked"
            inputMode="numeric"
            value={code}
            onIonInput={(e) => {
              setCode(e.detail.value ?? "");
              setError(null);
            }}
          />
        </IonItem>
        {error && (
          <IonItem lines="none">
            <IonNote color="danger">{error}</IonNote>
          </IonItem>
        )}
      </IonList>
      <div className="ion-padding">
        <IonButton expand="block" onClick={handleVerify} disabled={loading}>
          {loading ? <IonSpinner /> : "Verify Code"}
        </IonButton>
        <IonButton expand="block" fill="clear" onClick={() => setPhase("request")}>
          Resend Code
        </IonButton>
      </div>
    </>
  );
}
