import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  label: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
});

interface SectionLabelPageProps {
  label: string;
}

export function SectionLabelPage({ label }: SectionLabelPageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
