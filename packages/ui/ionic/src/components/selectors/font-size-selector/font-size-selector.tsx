import { IonSelect, IonSelectOption } from "@ionic/react";
import { isValidFontSize, useFontSize } from "@amodeo/utils";
import type { FontSize } from "@amodeo/utils";

const OPTIONS: { value: FontSize; label: string }[] = [
  { value: "xs", label: "Extra Small" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
  { value: "2xl", label: "Huge" },
];

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useFontSize();

  return (
    <IonSelect
      value={fontSize}
      onIonChange={(e) => {
        const selected = e.detail.value;
        if (typeof selected === "string" && isValidFontSize(selected)) {
          setFontSize(selected);
        }
      }}
    >
      {OPTIONS.map((option) => (
        <IonSelectOption key={option.value} value={option.value}>
          {option.label}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
}
