import { IonSelectOption } from "@ionic/react";
import { SelectInput, useErrorToast } from "@amodeo/ionic";
import type { PublisherRecord } from "../../../../publisher-schema.js";
import { useUpdatePublisher } from "../../../../hooks/use-update-publisher.js";
import { describePublisherError } from "../../../../publisher-errors.js";

export interface TypeDetailRowProps {
  publisher: PublisherRecord;
}

type PublisherType = PublisherRecord["type"];

const OPTIONS: { value: PublisherType; label: string }[] = [
  { value: "publisher", label: "Publisher" },
  { value: "regular_pioneer", label: "Regular Pioneer" },
  { value: "special_pioneer", label: "Special Pioneer" },
  { value: "continuous_auxiliary", label: "Continuous Auxiliary" },
  { value: "inactive", label: "Inactive" },
  { value: "speaker", label: "Speaker" },
  { value: "associate", label: "Associate" },
  { value: "circuit_overseer", label: "Circuit Overseer" },
];

export function TypeDetailRow({ publisher }: TypeDetailRowProps) {
  const { presentError } = useErrorToast({ describeError: describePublisherError });
  const { update: updatePublisher } = useUpdatePublisher({ onError: presentError });

  return (
    <SelectInput
      label="Type"
      value={publisher.type}
      onIonChange={(e) => {
        const option = OPTIONS.find((o) => o.value === e.detail.value);
        if (option) {
          updatePublisher(publisher.id, { type: option.value });
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
