import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { PUBLISHER_TYPES } from "../../publisher-schema.js";
import type { PublisherRecord } from "../../publisher-schema.js";

export type PublisherTypeFilter = PublisherRecord["type"] | "all";

export interface PublisherFilterSelectProps {
  value: PublisherTypeFilter;
  onChange: (value: PublisherTypeFilter) => void;
}

function toLabel(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const OPTIONS: { value: PublisherTypeFilter; label: string }[] = [
  { value: "all", label: "All Publishers" },
  ...PUBLISHER_TYPES.map((value) => ({ value, label: toLabel(value) })),
];

export function PublisherFilterSelect({ value, onChange }: PublisherFilterSelectProps) {
  return (
    <IonList inset>
      <IonItem>
        <IonSelect
          label="Filter"
          value={value}
          onIonChange={(e) => onChange(e.detail.value as PublisherTypeFilter)}
        >
          {OPTIONS.map((option) => (
            <IonSelectOption key={option.value} value={option.value}>
              {option.label}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </IonList>
  );
}
