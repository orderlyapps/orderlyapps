import { IonSelectOption } from "@ionic/react";
import { SelectInput, useErrorToast } from "@amodeo/ionic";
import type { PublisherRecord } from "../../../../publisher-schema.js";
import { useUpdatePublisher } from "../../../../hooks/use-update-publisher.js";
import { describePublisherError } from "../../../../publisher-errors.js";

export interface StandingDetailRowProps {
  publisher: PublisherRecord;
}

type Standing = PublisherRecord["standing"];

const OPTIONS: { value: Standing; label: string }[] = [
  { value: "elder", label: "Elder" },
  { value: "ministerial_servant", label: "Ministerial Servant" },
  { value: "publisher", label: "Publisher" },
  { value: "unbaptised_publisher", label: "Unbaptised Publisher" },
  { value: "associate", label: "Associate" },
];

export function StandingDetailRow({ publisher }: StandingDetailRowProps) {
  const { presentError } = useErrorToast({ describeError: describePublisherError });
  const { update: updatePublisher } = useUpdatePublisher({ onError: presentError });

  return (
    <SelectInput
      label="Standing"
      value={publisher.standing}
      onIonChange={(e) => {
        const option = OPTIONS.find((o) => o.value === e.detail.value);
        if (option) {
          updatePublisher(publisher.id, { standing: option.value });
        }
      }}
    >
      {OPTIONS.map((option) => (
        <IonSelectOption key={option.value} value={option.value}>
          {option.label}
        </IonSelectOption>
      ))}
    </SelectInput>
  );
}
