import { MissingReportsSection } from "./components/missing-reports-section/missing-reports-section.tsx";

const MONTH_COUNTS = [1, 2, 3, 4, 5, 6];

export function MissingReportsList() {
  return (
    <>
      {MONTH_COUNTS.map((months) => (
        <MissingReportsSection key={months} months={months} />
      ))}
    </>
  );
}
