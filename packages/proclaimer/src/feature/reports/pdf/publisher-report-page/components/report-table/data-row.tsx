import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { MonthReport } from "../../types.ts";

const W = ["15%", "12.5%", "12.5%", "12.5%", "12.5%", "35%"];

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  cellView: { padding: 1, borderColor: "black" },
  cellText: { fontSize: 10, padding: 1, paddingHorizontal: 4 },
});

function borders(col: number, isLast: boolean) {
  return {
    borderTopWidth: 0,
    borderBottomWidth: isLast ? 1.3 : 0.3,
    borderLeftWidth: col === 0 ? 1.3 : 0.3,
    borderRightWidth: col === 5 ? 1.3 : 0.3,
  };
}

export function DataRow({ report, isLast }: { report: MonthReport; isLast: boolean }) {
  const c = { textAlign: "center" as const };
  const l = { textAlign: "left" as const };
  return (
    <View style={styles.row} wrap={false}>
      <View style={[styles.cellView, { width: W[0] }, borders(0, isLast)]}>
        <Text style={[styles.cellText, l]}>{report.month_name}</Text>
      </View>
      <View style={[styles.cellView, { width: W[1] }, borders(1, isLast)]}>
        <Text style={[styles.cellText, c]}>{report.active ? "X" : ""}</Text>
      </View>
      <View style={[styles.cellView, { width: W[2] }, borders(2, isLast)]}>
        <Text style={[styles.cellText, c]}>{report.bible_studies ?? ""}</Text>
      </View>
      <View style={[styles.cellView, { width: W[3] }, borders(3, isLast)]}>
        <Text style={[styles.cellText, c]}>{report.auxiliary_pioneer ? "X" : ""}</Text>
      </View>
      <View style={[styles.cellView, { width: W[4] }, borders(4, isLast)]}>
        <Text style={[styles.cellText, c, { fontSize: 12 }]}>{report.hours ?? " "}</Text>
      </View>
      <View style={[styles.cellView, { width: W[5] }, borders(5, isLast)]}>
        <Text style={[styles.cellText, l]}>{report.comments ?? ""}</Text>
      </View>
    </View>
  );
}
