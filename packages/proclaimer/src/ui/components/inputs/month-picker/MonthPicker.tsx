import { Select } from "@amodeo/proclaimer/ui/components/inputs/select/Select";

type MonthOption = {
  readonly value: string;
  readonly label: string;
};

type MonthPickerProps = {
  readonly value?: string;
  readonly on_value_change?: (value: {
    readonly firstMonday: string;
    readonly lastMonday: string;
  }) => void;
  readonly label?: string;
  readonly months_in_future?: number;
  readonly months_in_past?: number;
};

function getMonthOptions(months_in_past: number, months_in_future: number): MonthOption[] {
  const now = new Date();
  const options: MonthOption[] = [];

  for (let i = -months_in_past; i <= months_in_future; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const month_name = date.toLocaleDateString(undefined, {
      month: "long",
    });
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    options.push({
      value,
      label: i === 0 ? `${month_name} (Current)` : month_name,
    });
  }

  return options;
}

function getFirstMondayOfMonth(year: number, month: number): Date {
  const first_day_of_month = new Date(year, month - 1, 1);
  const day_of_week = first_day_of_month.getDay();
  const offset_to_monday = (8 - day_of_week) % 7;
  return new Date(year, month - 1, 1 + offset_to_monday);
}

function getLastMondayOfMonth(year: number, month: number): Date {
  const last_day_of_month = new Date(year, month, 0);
  const day_of_week = last_day_of_month.getDay();
  const days_to_subtract = day_of_week === 0 ? 6 : day_of_week - 1;
  return new Date(year, month - 1, last_day_of_month.getDate() - days_to_subtract);
}

function formatDateToYyyyMmDd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function MonthPicker({
  value,
  on_value_change,
  label,
  months_in_future = 2,
  months_in_past = 0,
}: MonthPickerProps) {
  const month_options = getMonthOptions(months_in_past, months_in_future);

  const handleChange = (selected_value: string | string[] | null) => {
    if (!selected_value || Array.isArray(selected_value)) return;
    const [year, month] = selected_value.split("-").map(Number);

    const first_monday = getFirstMondayOfMonth(year, month);
    const last_monday = getLastMondayOfMonth(year, month);

    on_value_change?.({
      firstMonday: formatDateToYyyyMmDd(first_monday),
      lastMonday: formatDateToYyyyMmDd(last_monday),
    });
  };

  return (
    <Select
      label={label ?? "Month"}
      value={value ?? null}
      options={month_options}
      on_change={handleChange}
      interface_type="popover"
      placeholder="Select month"
    />
  );
}
