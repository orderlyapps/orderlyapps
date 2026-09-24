import { Document, Page, Text, View } from "@react-pdf/renderer";
import { shared } from "./map-log-pdf-styles.ts";
import type { MapLogPdfRow } from "./map-log-pdf-styles.ts";
import { MapLogPdfTableRow } from "./components/map-log-pdf-table-row/MapLogPdfTableRow.tsx";

const ROWS_PER_PAGE = 20;

function chunkRows(rows: MapLogPdfRow[], size: number): MapLogPdfRow[][] {
  const chunks: MapLogPdfRow[][] = [];
  for (let i = 0; i < rows.length; i += size) {
    chunks.push(rows.slice(i, i + size));
  }
  if (chunks.length === 0) chunks.push([]);
  return chunks;
}

interface MapLogPdfProps {
  rows: MapLogPdfRow[];
}

export function MapLogPdf({ rows }: MapLogPdfProps) {
  const pages = chunkRows(rows, ROWS_PER_PAGE);

  return (
    <Document>
      {pages.map((pageRows, pageIndex) => (
        <Page key={pageIndex} size="A4" style={shared.page}>
          <View fixed>
            <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "bold" }}>
              TERRITORY ASSIGNMENT RECORD
            </Text>
            <Text style={{ textAlign: "left", marginTop: 0, fontSize: 12, fontWeight: "bold" }}>
              Service Year: {new Date().getFullYear()}
            </Text>
          </View>
          <View style={shared.table}>
            <MapLogPdfTableRow isHeader />
            {Array.from({ length: ROWS_PER_PAGE }, (_, i) => (
              <MapLogPdfTableRow key={i} isLast={i === ROWS_PER_PAGE - 1} data={pageRows[i]} />
            ))}
          </View>
          <View style={shared.footer} fixed>
            <Text style={[shared.caption, { marginBottom: 2 }]}>
              * When beginning a new sheet, use this column to record the date on which each
              territory was last completed.
            </Text>
            <Text style={shared.caption}>S-13-E 1/22</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
}
