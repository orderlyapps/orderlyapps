import { useState } from "react";
import { IonAlert, IonItem, IonLabel } from "@ionic/react";
import {
  formatPublisherName,
  type PublisherNameFields,
  type PublisherNameFormat,
} from "../publisher-name/publisher-name.js";

export type PublisherNameValue = PublisherNameFields;

export interface PublisherNameInputProps {
  value?: PublisherNameValue;
  onChange: (value: PublisherNameValue) => void;
  lines?: "full" | "none" | "inset";
}

const DISPLAY_FORMAT: PublisherNameFormat = "first_name (display_name) middle_name last_name";

export function PublisherNameInput({ value, onChange, lines = "full" }: PublisherNameInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  // Snapshot the values when the alert opens so a change to `value` while the
  // alert is open (e.g. a parent re-render) does not reset the user's in-progress
  // edits via IonAlert's @Watch('inputs') handler.
  const [snapshot, setSnapshot] = useState<PublisherNameValue | null>(null);

  const open = () => {
    setErrorMessage(undefined);
    setSnapshot(value ?? null);
    setIsOpen(true);
  };

  const baseValue = snapshot ?? value;

  return (
    <>
      <IonItem lines={lines} button detail onClick={open}>
        <IonLabel>
          <h2>{value ? formatPublisherName(value, DISPLAY_FORMAT) : "Tap to enter name"}</h2>
        </IonLabel>
      </IonItem>
      <IonAlert
        isOpen={isOpen}
        header="Enter name"
        message={errorMessage}
        onDidDismiss={() => setIsOpen(false)}
        inputs={[
          {
            name: "first_name",
            type: "text",
            placeholder: "First name",
            value: baseValue?.first_name ?? "",
          },
          {
            name: "middle_name",
            type: "text",
            placeholder: "Middle name (optional)",
            value: baseValue?.middle_name ?? "",
          },
          {
            name: "last_name",
            type: "text",
            placeholder: "Last name",
            value: baseValue?.last_name ?? "",
          },
          {
            name: "display_name",
            type: "text",
            placeholder: "Display name (optional)",
            value: baseValue?.display_name ?? "",
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Save",
            role: "confirm",
            handler: (data) => {
              const firstName = (data.first_name ?? "").trim();
              const lastName = (data.last_name ?? "").trim();

              if (!firstName || !lastName) {
                setErrorMessage("First name and last name are required.");
                // Returning false keeps the alert open.
                return false;
              }

              setErrorMessage(undefined);
              onChange({
                first_name: firstName,
                middle_name: (data.middle_name ?? "").trim() || null,
                last_name: lastName,
                display_name: (data.display_name ?? "").trim() || null,
              });
            },
          },
        ]}
      />
    </>
  );
}
