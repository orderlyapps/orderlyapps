import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";

const VISIT_TYPE_OPTIONS = [
  { label: "Return", value: "return" },
  { label: "Letter", value: "letter" },
  { label: "Return Visit", value: "return_visit" },
];

const DO_NOT_CALL_OPTION = { label: "Do Not Call", value: "do_not_call" };

type VisitTypeSelectProps = {
  value: "letter" | "return" | "return_visit" | "do_not_call";
  disabled?: boolean;
  include_do_not_call?: boolean;
  on_change: (value: "letter" | "return" | "return_visit" | "do_not_call") => void;
};

export function VisitTypeSelect({
  value,
  disabled,
  include_do_not_call = false,
  on_change,
}: VisitTypeSelectProps) {
  const options = include_do_not_call
    ? [...VISIT_TYPE_OPTIONS, DO_NOT_CALL_OPTION]
    : VISIT_TYPE_OPTIONS;
  return (
    <Select
      label="List"
      value={value}
      options={options}
      disabled={disabled}
      on_change={(value) =>
        on_change(value as "letter" | "return" | "return_visit" | "do_not_call")
      }
      interface_type="popover"
    />
  );
}
