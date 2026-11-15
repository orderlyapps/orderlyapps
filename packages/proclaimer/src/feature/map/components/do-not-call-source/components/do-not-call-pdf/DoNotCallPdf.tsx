import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { format, isValid } from "date-fns";
import type { DoNotCall } from "../../types.ts";
import { formatAddressNumber } from "@amodeo/proclaimer/feature/territory";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 15,
    fontSize: 9,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 6,
    color: "#666",
  },
  table: {
    flexDirection: "column",
    width: "auto",
  },
  tableRow: {
    flexDirection: "row",
    padding: 2.5,
  },
  tableHeaderRow: {
    flexDirection: "row",
    padding: 1,
  },
  tableColHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#f0f0f0",
    padding: 1,
  },
  tableCol: {},
  colAddress: { width: "30%" },
  colSuburb: { width: "22%" },
  colNotes: { width: "33%", fontSize: 8 },
  colAdded: { width: "15%" },
  tableCellHeader: {
    fontSize: 8,
    fontWeight: "bold",
  },
  tableCell: {
    textAlign: "left",
  },
  noData: {
    textAlign: "center",
    fontSize: 12,
  },
});

type DoNotCallPdfProps = {
  do_not_calls: DoNotCall[];
  congregation_name?: string;
};

function formatAddress(dnc: DoNotCall): string {
  return `${formatAddressNumber(dnc)} ${dnc.street}`;
}

function formatAdded(created_at?: string): string {
  if (!created_at) return "-";
  const date = new Date(created_at);
  return isValid(date) ? format(date, "dd MMM yyyy") : "-";
}

export function DoNotCallPdf({ do_not_calls, congregation_name }: DoNotCallPdfProps) {
  const subtitle = `${congregation_name ? `${congregation_name} — ` : ""}Generated ${format(
    new Date(),
    "dd MMM yyyy",
  )}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Do Not Call List</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {do_not_calls.length === 0 ? (
          <Text style={styles.noData}>No do not calls found</Text>
        ) : (
          <View style={styles.table}>
            <View style={styles.tableHeaderRow} fixed>
              <View style={[styles.tableColHeader, styles.colAddress]}>
                <Text style={styles.tableCellHeader}>Address</Text>
              </View>
              <View style={[styles.tableColHeader, styles.colSuburb]}>
                <Text style={styles.tableCellHeader}>Suburb</Text>
              </View>
              <View style={[styles.tableColHeader, styles.colNotes]}>
                <Text style={styles.tableCellHeader}>Notes</Text>
              </View>
              <View style={[styles.tableColHeader, styles.colAdded]}>
                <Text style={styles.tableCellHeader}>Added</Text>
              </View>
            </View>

            {do_not_calls.map((dnc) => (
              <View key={dnc.id} style={styles.tableRow} wrap={false}>
                <View style={[styles.tableCol, styles.colAddress]}>
                  <Text style={styles.tableCell}>{formatAddress(dnc)}</Text>
                </View>
                <View style={[styles.tableCol, styles.colSuburb]}>
                  <Text style={styles.tableCell}>{dnc.suburb}</Text>
                </View>
                <View style={[styles.tableCol, styles.colNotes]}>
                  <Text style={styles.tableCell}>{dnc.notes || "-"}</Text>
                </View>
                <View style={[styles.tableCol, styles.colAdded]}>
                  <Text style={styles.tableCell}>{formatAdded(dnc.created_at)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
