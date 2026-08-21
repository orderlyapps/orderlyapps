import { useState } from "react";
import { IonButton, IonInput, IonItem, IonList, IonNote, IonSpinner } from "@ionic/react";
import { describeSupabaseError } from "@amodeo/utils/supabase";
import { getErrorMessage } from "@amodeo/utils/errors";
import { useSupabase } from "../../../../../../supabase/supabase-context.js";

export interface PasswordFormProps {
  email: string;
  onSuccess: () => void | Promise<void>;
}

export function PasswordForm({ email, onSuccess }: PasswordFormProps) {
  const supabase = useSupabase();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(describeSupabaseError(signInError));
      } else {
        await onSuccess();
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IonList inset>
        <IonItem>
          <IonInput
            label="Password"
            labelPlacement="stacked"
            type="password"
            value={password}
            onIonInput={(e) => {
              setPassword(e.detail.value ?? "");
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
        <IonButton expand="block" onClick={handleSubmit} disabled={loading}>
          {loading ? <IonSpinner /> : "Sign In"}
        </IonButton>
      </div>
    </>
  );
}
