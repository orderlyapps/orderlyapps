import { TextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/TextButton";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";

const CSV_TEMPLATE = `map_name,publisher_name,checked_out_at,checked_in_at,notes
Downtown,"Smith, John",2024-01-15,2024-02-15,Optional notes
`;

export function CsvTemplateDownload() {
  function handleDownload() {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "map-log-template.csv";
    document.body.appendChild(a);
    try {
      a.click();
    } finally {
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  }

  return (
    <>
      <div className="ion-text-center">
        <Body>Download a CSV template to fill in map log data.</Body>
      </div>
      <Space />
      <TextButton label="Download Template" on_click={handleDownload} />
    </>
  );
}
