import type { GroupedReportEntry, PublisherReportEntry } from "./types.ts";

export function groupEntriesByLabel(entries: PublisherReportEntry[]): GroupedReportEntry[] {
  const groups: GroupedReportEntry[] = [];
  let current_group: GroupedReportEntry | null = null;

  for (const entry of entries) {
    if (!current_group || current_group.group_label !== entry.group_label) {
      current_group = {
        group_label: entry.group_label,
        group_id: `group-${groups.length}`,
        entries: [],
      };
      groups.push(current_group);
    }
    current_group.entries.push(entry);
  }

  return groups;
}
