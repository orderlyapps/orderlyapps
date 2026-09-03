import { Text, View, Link, StyleSheet } from "@react-pdf/renderer";
import type { GroupedReportEntry } from "../../types.ts";

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  groupHeader: { fontSize: 14, fontWeight: "bold", marginTop: 12, marginBottom: 4 },
  columns: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  link: { fontSize: 9, marginBottom: 4, textDecoration: "none", width: "33%" },
});

interface PublisherLinksPageProps {
  groups: GroupedReportEntry[];
}

export function PublisherLinksPage({ groups }: PublisherLinksPageProps) {
  return (
    <>
      <Text style={styles.title}>Publishers</Text>
      <View>
        {groups.map((group) => (
          <View key={group.group_id} wrap={false}>
            <Text style={styles.groupHeader}>{group.group_label}</Text>
            <View style={styles.columns}>
              {group.entries.map((entry, i) => (
                <Link key={i} src={`#publisher-${group.group_id}-${i}`} style={styles.link}>
                  {`${entry.publisher.last_name}, ${entry.publisher.first_name}`}
                </Link>
              ))}
            </View>
          </View>
        ))}
      </View>
    </>
  );
}
