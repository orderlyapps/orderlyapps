import { IonDatetime, IonModal } from "@ionic/react";
import { useState } from "react";
import { InputWrapper } from "@amodeo/proclaimer/ui/components/display/input/InputWrapper";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { useThemeColorWhileOpen } from "../../../../ui/components/inputs/date/hooks/useThemeColorWhileOpen.ts";
import { formatMonth, currentFirstOfMonth } from "../../utils/pioneer-period.ts";

interface MonthYearInputProps {
  label: string;
  value: string | null;
  disabled?: boolean;
  on_change: (value: string) => void;
}

export function MonthYearInput({ label, value, disabled = false, on_change }: MonthYearInputProps) {
  const [is_open, set_is_open] = useState(false);
  useThemeColorWhileOpen(is_open);

  function handleChange(detail_value: string | string[] | null | undefined) {
    if (!detail_value || Array.isArray(detail_value)) return;
    on_change(`${detail_value.substring(0, 7)}-01`);
  }

  return (
    <InputWrapper label={label}>
      <div
        onClick={() => !disabled && set_is_open(true)}
        style={disabled ? { opacity: 0.4 } : undefined}
      >
        <Body color={disabled || !value ? "medium" : undefined}>
          {value ? formatMonth(value) : "Select month"}
        </Body>
      </div>

      <IonModal isOpen={is_open} onDidDismiss={() => set_is_open(false)}>
        <IonDatetime
          presentation="month-year"
          value={value?.substring(0, 7)}
          max={currentFirstOfMonth().substring(0, 7)}
          showDefaultButtons
          onIonChange={(e) => handleChange(e.detail.value)}
        />
      </IonModal>
    </InputWrapper>
  );
}
