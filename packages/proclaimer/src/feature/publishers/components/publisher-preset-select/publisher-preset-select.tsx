import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { PUBLISHER_FILTER_PRESETS } from "../../publisher-filter-presets.js";
import type { PublisherPresetId } from "../../publisher-filter-presets.js";

export type PublisherPresetFilter = "all" | PublisherPresetId;

export interface PublisherPresetSelectProps {
  value: PublisherPresetFilter;
  onChange: (value: PublisherPresetFilter) => void;
}

const OPTIONS: { value: PublisherPresetFilter; label: string }[] = [
  { value: "all", label: "All Publishers" },
  ...PUBLISHER_FILTER_PRESETS.map((preset) => ({ value: preset.id, label: preset.label })),
];

export function PublisherPresetSelect({ value, onChange }: PublisherPresetSelectProps) {
  return (
    <IonList inset>
      <IonItem>
        <IonSelect
          label="Preset"
          value={value}
          onIonChange={(e) => onChange(e.detail.value as PublisherPresetFilter)}
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
