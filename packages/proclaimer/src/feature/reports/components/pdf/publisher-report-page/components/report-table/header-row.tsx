import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatServiceYear } from "../../../utils/service-year.ts";

const W = ["15%", "12.5%", "12.5%", "12.5%", "12.5%", "35%"];

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  cellView: { padding: 1, borderColor: "black" },
  headerText: { fontSize: 10, fontWeight: "bold", textAlign: "center" },
  headerCell: { justifyContent: "center", paddingVertical: 8 },
  headerSubText: { fontSize: 9, textAlign: "center", marginTop: 2 },
});

function borders(col: number, isHeader: boolean) {
  return {
    borderTopWidth: isHeader ? 1.3 : 0,
    borderBottomWidth: 0.3,
    borderLeftWidth: col === 0 ? 1.3 : 0.3,
    borderRightWidth: col === 5 ? 1.3 : 0.3,
  };
}

const LABELS = [
  "Service Year",
  "Shared in\nMinistry",
  "Bible\nStudies",
  "Auxiliary\nPioneer",
  "Hours",
  "Remarks",
];

export function HeaderRow({ service_year }: { service_year: string }) {
  return (
    <View style={styles.row}>
      {LABELS.map((label, i) => (
        <View
          key={i}
          style={[styles.cellView, styles.headerCell, { width: W[i] }, borders(i, true)]}
        >
          <Text style={styles.headerText}>{label}</Text>
          {i === 0 && <Text style={styles.headerSubText}>{formatServiceYear(service_year)}</Text>}
        </View>
      ))}
    </View>
  );
}
