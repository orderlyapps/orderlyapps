import { Select } from "../../../../../../ui/components/inputs/select/Select.tsx";
import {
  MISSING_DETAIL_LABELS,
  type MissingDetailFilter,
  type MissingDetailType,
} from "../../hooks/use-missing-details/use-missing-details.ts";

interface MissingDetailsSelectProps {
  value: MissingDetailFilter;
  on_change: (value: MissingDetailFilter) => void;
}

const DETAIL_OPTIONS: MissingDetailType[] = [
  "phone",
  "address",
  "email",
  "emergency_contact",
  "birth_date",
  "baptism_date",
];

export function MissingDetailsSelect({ value, on_change }: MissingDetailsSelectProps) {
  const options = [
    { label: "All Missing Details", value: "all" },
    ...DETAIL_OPTIONS.map((detail) => ({
      label: MISSING_DETAIL_LABELS[detail],
      value: detail,
    })),
  ];

  return (
    <Select
      label="Filter by missing detail"
      value={value}
      options={options}
      placeholder="Select a detail"
      on_change={(v) => on_change((v as MissingDetailFilter) ?? "all")}
    />
  );
}
