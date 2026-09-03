import { IonActionSheet } from "@ionic/react";
import {
  formatServiceYear,
  getCurrentAndPreviousServiceYears,
  getPreviousTwoServiceYears,
} from "../../../utils/service-year.ts";

interface ServiceYearActionSheetProps {
  is_open: boolean;
  on_close: () => void;
  on_select_current_previous: () => void;
  on_select_previous_two: () => void;
}

export function ServiceYearActionSheet({
  is_open,
  on_close,
  on_select_current_previous,
  on_select_previous_two,
}: ServiceYearActionSheetProps) {
  const current_previous = getCurrentAndPreviousServiceYears();
  const previous_two = getPreviousTwoServiceYears();

  return (
    <IonActionSheet
      isOpen={is_open}
      onDidDismiss={on_close}
      header="Download Records"
      subHeader="Select service years"
      buttons={[
        {
          text: `${formatServiceYear(current_previous[1])}`,
          handler: on_select_current_previous,
        },
        {
          text: `${formatServiceYear(previous_two[1])}`,
          handler: on_select_previous_two,
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: on_close,
        },
      ]}
    />
  );
}
