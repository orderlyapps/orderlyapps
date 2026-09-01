import { IonCol } from "@ionic/react";
import { ToggleInput } from "../../../../../../ui/components/inputs/toggle/ToggleInput.tsx";
import { RESPONSIVE_COL_SIZES } from "../../../../../../ui/types/responsive-col-sizes.ts";

interface MissingDetailsTogglesProps {
  show_associate: boolean;
  show_archived: boolean;
  on_show_associate_change: (value: boolean) => void;
  on_show_archived_change: (value: boolean) => void;
}

export function MissingDetailsToggles({
  show_associate,
  show_archived,
  on_show_associate_change,
  on_show_archived_change,
}: MissingDetailsTogglesProps) {
  return (
    <>
      <IonCol {...RESPONSIVE_COL_SIZES}>
        <ToggleInput
          label="Show Associates"
          checked={show_associate}
          on_change={on_show_associate_change}
        />
      </IonCol>
      <IonCol {...RESPONSIVE_COL_SIZES}>
        <ToggleInput
          label="Show Archived"
          checked={show_archived}
          on_change={on_show_archived_change}
        />
      </IonCol>
    </>
  );
}
