import { useState } from "react";
import { IonAlert, IonItem, IonLabel } from "@ionic/react";
import { useErrorToast } from "@amodeo/ionic";
import type { CongregationRecord } from "../../../../congregation-schema.js";
import { useUpdateCongregation } from "../../../../hooks/use-update-congregation.js";
import { describeCongregationError } from "../../../../congregation-errors.js";

export interface NameDetailRowProps {
  congregation: CongregationRecord;
}

export function NameDetailRow({ congregation }: NameDetailRowProps) {
  const { presentError } = useErrorToast({ describeError: describeCongregationError });
  const { update: updateCongregation } = useUpdateCongregation({ onError: presentError });
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  // Snapshot the congregation's name when the alert opens so a real-time
  // update to `congregation` while the alert is open does not reset the user's
  // in-progress edits via IonAlert's @Watch('inputs') handler.
  const [snapshot, setSnapshot] = useState<string | null>(null);

  const open = () => {
    setErrorMessage(undefined);
    setSnapshot(congregation.name);
    setIsOpen(true);
  };

  const baseValue = snapshot ?? congregation.name;

  return (
    <>
      <IonItem lines="full" button detail onClick={open}>
        <IonLabel>
          <h2>{congregation.name}</h2>
        </IonLabel>
      </IonItem>
      <IonAlert
        isOpen={isOpen}
        header="Edit name"
        message={errorMessage}
        onDidDismiss={() => setIsOpen(false)}
        inputs={[
          {
            name: "name",
            type: "text",
            placeholder: "Congregation name",
            value: baseValue,
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Save",
            role: "confirm",
            handler: (data) => {
              const name = (data.name ?? "").trim();

              if (!name) {
                setErrorMessage("Name is required.");
                // Returning false keeps the alert open.
                return false;
              }

              setErrorMessage(undefined);
              updateCongregation(congregation.id, { name });
            },
          },
        ]}
      />
    </>
  );
}
