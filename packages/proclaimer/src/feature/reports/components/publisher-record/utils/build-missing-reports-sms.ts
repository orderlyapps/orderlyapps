import type { MonthKey } from "../../missing-reports-list/utils/get-previous-months.ts";

interface BuildSmsParams {
  publisher_name: string;
  missing_months: MonthKey[];
  is_almost_inactive: boolean;
}

export function buildMissingReportsSms({
  publisher_name,
  missing_months,
  is_almost_inactive,
}: BuildSmsParams): string {
  const month_list = [...missing_months]
    .reverse()
    .map((m) => m.label)
    .join(", ");
  const base = `${publisher_name} is missing the following ministry reports: ${month_list}.`;
  const warning = is_almost_inactive
    ? " They are at risk of becoming inactive and need to report soon."
    : "";
  return `${base}${warning}`;
}

export function buildSmsUrl(phone: string, body: string): string {
  return `sms:${phone}?body=${encodeURIComponent(body)}`;
}
