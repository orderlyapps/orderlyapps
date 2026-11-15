import { IonList } from "@ionic/react";
import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";
import { useNotAtHomeStaleDays } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useNotAtHomeStaleDaysContext";
import { NOT_AT_HOME_STALE_DAY_CHOICES } from "@proclaimer-content/pages/ministry/door-to-door/shared/notAtHomeStaleDays";

const options = NOT_AT_HOME_STALE_DAY_CHOICES.map((days) => ({
  label: days === 0 ? "Never" : `${days} ${days === 1 ? "day" : "days"}`,
  value: String(days),
}));

export function NotAtHomeStaleDaysSetting() {
  const { staleDays, updateStaleDays } = useNotAtHomeStaleDays();

  return (
    <IonList>
      <Select
        label="Mark Not At Homes Purple After"
        value={String(staleDays)}
        options={options}
        on_change={(value) => {
          if (typeof value !== "string") return;
          updateStaleDays(Number(value));
        }}
      />
    </IonList>
  );
}
