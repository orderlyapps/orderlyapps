import { useState } from "react";
import { IonItem } from "@ionic/react";
import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";
import { ToggleInput } from "@amodeo/proclaimer/ui/components/inputs/toggle/ToggleInput";
import { SaveTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/save/SaveTextButton";
import { DeleteTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/delete/DeleteTextButton";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { MonthYearInput } from "../../../month-year-input/month-year-input.tsx";
import { currentFirstOfMonth } from "../../../../utils/pioneer-period.ts";
import { validatePeriodInput } from "../../../../utils/validate-period.ts";
import { useSavePeriod } from "../../../../hooks/use-save-period.ts";
import { usePublisherOptions } from "../../../../hooks/use-publisher-options.ts";
import type { RegularPioneer } from "../../../../schemas/regular-pioneer.ts";

interface PeriodFormProps {
  period?: RegularPioneer;
  fixed_publisher_id?: string;
  periods: RegularPioneer[];
  on_save: () => void;
}

export function PeriodForm({ period, fixed_publisher_id, periods, on_save }: PeriodFormProps) {
  const [publisher_id, set_publisher_id] = useState(
    period?.publisher_id ?? fixed_publisher_id ?? "",
  );
  const [start_month, set_start_month] = useState(period?.start_month ?? "");
  const [still_pioneering, set_still_pioneering] = useState(
    period ? period.end_month === null : true,
  );
  const [end_month, set_end_month] = useState(period?.end_month ?? currentFirstOfMonth());
  const [error, set_error] = useState<string | null>(null);
  const { save, remove } = useSavePeriod();
  const publisher_options = usePublisherOptions();

  const handle_save = () => {
    const end = still_pioneering ? null : end_month;
    const validation_error = validatePeriodInput(
      { publisher_id, start_month, end_month: end },
      periods,
      period?.id,
    );
    if (validation_error) return set_error(validation_error);
    save({ publisher_id, start_month, end_month: end }, period);
    on_save();
  };

  const handle_delete = () => {
    if (period) remove(period);
    on_save();
  };

  return (
    <>
      {!fixed_publisher_id && !period && (
        <Select
          label="Publisher"
          value={publisher_id || null}
          options={publisher_options}
          placeholder="Select publisher"
          on_change={(v) => typeof v === "string" && set_publisher_id(v)}
        />
      )}
      <MonthYearInput label="Start Month" value={start_month || null} on_change={set_start_month} />
      <ToggleInput
        label="Still Pioneering"
        checked={still_pioneering}
        on_change={set_still_pioneering}
      />
      {!still_pioneering && (
        <MonthYearInput label="End Month" value={end_month} on_change={set_end_month} />
      )}
      {error && (
        <IonItem lines="none">
          <Body color="danger" size="sm">
            {error}
          </Body>
        </IonItem>
      )}
      <Space />
      <SaveTextButton
        variant={period ? "update" : "save"}
        skip_confirmation
        on_click={handle_save}
      />
      {period && (
        <>
          <Space size="sm" />
          <DeleteTextButton
            label="Delete Period"
            alert_message="Delete this pioneer period?"
            on_click={handle_delete}
          />
        </>
      )}
    </>
  );
}
