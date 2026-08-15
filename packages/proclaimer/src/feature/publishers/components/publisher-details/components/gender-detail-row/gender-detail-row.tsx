import { IonSelectOption } from "@ionic/react";
import { SelectInput, useErrorToast } from "@amodeo/ionic";
import type { PublisherRecord } from "../../../../../../database/schemas/publisher.js";
import { useUpdatePublisher } from "../../../../hooks/use-update-publisher.js";
import { describePublisherError } from "../../../../publisher-errors.js";

export interface GenderDetailRowProps {
  publisher: PublisherRecord;
}

type Gender = PublisherRecord["gender"];

const OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export function GenderDetailRow({ publisher }: GenderDetailRowProps) {
  const { presentError } = useErrorToast({ describeError: describePublisherError });
  const { update: updatePublisher } = useUpdatePublisher({ onError: presentError });

  return (
    <SelectInput
      label="Gender"
      value={publisher.gender}
      onIonChange={(e) => {
        const option = OPTIONS.find((o) => o.value === e.detail.value);
        if (option) {
          updatePublisher(publisher.id, { gender: option.value });
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
