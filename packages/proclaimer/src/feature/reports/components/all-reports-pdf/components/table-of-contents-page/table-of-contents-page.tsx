import { Text, View, Link, StyleSheet } from "@react-pdf/renderer";
import type { GroupedReportEntry } from "../../types.ts";

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  link: { fontSize: 14, marginBottom: 8, textDecoration: "none" },
});

interface TableOfContentsPageProps {
  groups: GroupedReportEntry[];
}

export function TableOfContentsPage({ groups }: TableOfContentsPageProps) {
  return (
    <>
      <Text style={styles.title}>Table of Contents</Text>
      <View>
        {groups.map((group) => (
          <Link key={group.group_id} src={`#${group.group_id}`} style={styles.link}>
            {group.group_label}
          </Link>
        ))}
      </View>
    </>
  );
}
