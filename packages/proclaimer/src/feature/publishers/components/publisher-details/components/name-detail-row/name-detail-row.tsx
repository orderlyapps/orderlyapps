import { useState } from "react";
import { IonAlert, IonItem, IonLabel } from "@ionic/react";
import type { PublisherRecord } from "../../../../publisher-schema.js";
import { useUpdatePublisher } from "../../../../hooks/use-update-publisher.js";
import { PublisherName } from "../../../publisher-name/publisher-name.js";

export interface NameDetailRowProps {
  publisher: PublisherRecord;
}

export function NameDetailRow({ publisher }: NameDetailRowProps) {
  const { update: updatePublisher } = useUpdatePublisher();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const open = () => {
    setErrorMessage(undefined);
    setIsOpen(true);
  };

  return (
    <>
      <IonItem lines="full" button detail onClick={open}>
        <IonLabel>
          <h2>
            <PublisherName
              publisher={publisher}
              format="first_name (display_name) middle_name last_name"
            />
          </h2>
        </IonLabel>
      </IonItem>
      <IonAlert
        isOpen={isOpen}
        header="Edit name"
        message={errorMessage}
        onDidDismiss={() => setIsOpen(false)}
        inputs={[
          {
            name: "first_name",
            type: "text",
            placeholder: "First name",
            value: publisher.first_name,
          },
          {
            name: "middle_name",
            type: "text",
            placeholder: "Middle name (optional)",
            value: publisher.middle_name ?? "",
          },
          {
            name: "last_name",
            type: "text",
            placeholder: "Last name",
            value: publisher.last_name,
          },
          {
            name: "display_name",
            type: "text",
            placeholder: "Display name (optional)",
            value: publisher.display_name ?? "",
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
              updatePublisher(publisher.id, {
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
