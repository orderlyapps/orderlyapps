import { TextInput } from "@amodeo/proclaimer/ui/components/inputs/text/TextInput";
import { DateInput } from "@amodeo/proclaimer/ui/components/inputs/date/DateInput";
import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";
import { TimeInput } from "@amodeo/proclaimer/ui/components/inputs/time/TimeInput";
import type { EventFormFieldProps } from "../../types.ts";

export function KingdomMinistrySchoolForm(props: EventFormFieldProps) {
  const { on_change } = props;
  return (
    <>
      <Select
        label="Type"
        value={props.name}
        options={[
          { label: "Elders", value: "Kingdom Ministry School for Elders" },
          { label: "MS's", value: "Kingdom Ministry School for MS's" },
        ]}
        on_change={(v) => on_change("name", typeof v === "string" ? v : "")}
      />
      <TextInput label="Address" value={props.address} on_change={(v) => on_change("address", v)} />
      <DateInput
        label="Date"
        value={props.start_date}
        on_change={(v) => on_change("start_date", v)}
      />
      <TimeInput
        label="Start Time"
        value={props.start_time}
        on_change={(v) => on_change("start_time", v)}
      />
    </>
  );
}
