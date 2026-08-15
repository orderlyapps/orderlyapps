import { useState } from "react";
import { IonAlert, IonItem, IonLabel } from "@ionic/react";
import { useErrorToast } from "@amodeo/ionic";
import type { PublisherRecord } from "../../../../../../database/schemas/publisher.js";
import { useUpdatePublisher } from "../../../../hooks/use-update-publisher.js";
import { describePublisherError } from "../../../../publisher-errors.js";
import {
  PublisherName,
  type PublisherNameFields,
  type PublisherNameFormat,
} from "../../../publisher-name/publisher-name.js";

export interface NameDetailRowProps {
  publisher: PublisherRecord;
}

const DISPLAY_FORMAT: PublisherNameFormat = "first_name (display_name) middle_name last_name";

export function NameDetailRow({ publisher }: NameDetailRowProps) {
  const { presentError } = useErrorToast({ describeError: describePublisherError });
  const { update: updatePublisher } = useUpdatePublisher({ onError: presentError });
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  // Snapshot the publisher's name fields when the alert opens so a real-time
  // update to `publisher` while the alert is open does not reset the user's
  // in-progress edits via IonAlert's @Watch('inputs') handler.
  const [snapshot, setSnapshot] = useState<PublisherNameFields | null>(null);

  const open = () => {
    setErrorMessage(undefined);
    setSnapshot({
      first_name: publisher.first_name,
      middle_name: publisher.middle_name,
      last_name: publisher.last_name,
      display_name: publisher.display_name,
    });
    setIsOpen(true);
  };

  const baseValue = snapshot ?? publisher;

  return (
    <>
      <IonItem lines="full" button detail onClick={open}>
        <IonLabel>
          <h2>
            <PublisherName publisher={publisher} format={DISPLAY_FORMAT} />
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
            value: baseValue.first_name,
          },
          {
            name: "middle_name",
            type: "text",
            placeholder: "Middle name (optional)",
            value: baseValue.middle_name ?? "",
          },
          {
            name: "last_name",
            type: "text",
            placeholder: "Last name",
            value: baseValue.last_name,
          },
          {
            name: "display_name",
            type: "text",
            placeholder: "Display name (optional)",
            value: baseValue.display_name ?? "",
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
