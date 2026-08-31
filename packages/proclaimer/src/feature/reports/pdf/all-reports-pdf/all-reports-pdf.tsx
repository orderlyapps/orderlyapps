import { Fragment } from "react";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import { TableOfContentsPage } from "./components/table-of-contents-page/table-of-contents-page.tsx";
import { PublisherLinksPage } from "./components/publisher-links-page/publisher-links-page.tsx";
import { SectionLabelPage } from "./components/section-label-page/section-label-page.tsx";
import { PublisherPage } from "../publisher-report-page/publisher-page.tsx";
import { groupEntriesByLabel } from "./group-entries.ts";
import type { PublisherReportEntry } from "../publisher-report-page/types.ts";

const styles = StyleSheet.create({
  page: { padding: 18, fontSize: 8 },
});

interface AllReportsPdfProps {
  entries: PublisherReportEntry[];
}

export function AllReportsPdf({ entries }: AllReportsPdfProps) {
  const groups = groupEntriesByLabel(entries);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <TableOfContentsPage groups={groups} />
      </Page>
      <Page size="A4" style={styles.page}>
        <PublisherLinksPage groups={groups} />
      </Page>
      {groups.map((group) => (
        <Fragment key={group.group_id}>
          <Page size="A4" style={styles.page}>
            <View id={group.group_id}>
              <SectionLabelPage label={group.group_label} />
            </View>
          </Page>
          {group.entries.map((entry, i) => (
            <Page key={`${group.group_id}-${i}`} size="A4" style={styles.page}>
              <PublisherPage entry={entry} anchor_id={`publisher-${group.group_id}-${i}`} />
            </Page>
          ))}
        </Fragment>
      ))}
    </Document>
  );
}
