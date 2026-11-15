import { IonList } from "@ionic/react";
import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";
import { useNotAtHomeVisibility } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useNotAtHomeVisibilityContext";
import { isValidNotAtHomeVisibility } from "@proclaimer-content/pages/ministry/door-to-door/shared/notAtHomeVisibility";

const options = [
  { label: "Show All", value: "all" },
  { label: "Hide Old", value: "hide_old" },
  { label: "Hide New", value: "hide_new" },
];

export function NotAtHomeVisibilitySetting() {
  const { visibility, updateVisibility } = useNotAtHomeVisibility();

  return (
    <IonList>
      <Select
        label="Hide Not At Homes"
        value={visibility}
        options={options}
        on_change={(value) => {
          if (typeof value !== "string" || !isValidNotAtHomeVisibility(value)) return;
          updateVisibility(value);
        }}
      />
    </IonList>
  );
}
