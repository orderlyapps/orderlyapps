import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  cellView: { padding: 1, borderColor: "black" },
  totalLabelText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
    padding: 3,
    paddingRight: 6,
  },
  totalCellText: { fontSize: 12, textAlign: "center" },
});

export function TotalRow({ total_hours }: { total_hours: number }) {
  return (
    <View style={styles.row}>
      <View style={{ width: "52.5%", borderRightWidth: 0.5 }}>
        <Text style={styles.totalLabelText}>Total</Text>
      </View>
      <View
        style={[
          styles.cellView,
          { width: "12.5%", borderBottomWidth: 1.3, borderLeftWidth: 0.8, borderRightWidth: 0.8 },
        ]}
      >
        <Text style={styles.totalCellText}>{total_hours}</Text>
      </View>
      <View
        style={[
          styles.cellView,
          { width: "35%", borderBottomWidth: 1.3, borderLeftWidth: 0.5, borderRightWidth: 1.3 },
        ]}
      />
    </View>
  );
}
