import { useState } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { pdf } from "@react-pdf/renderer";
import { GroupsPdf, PdfActionSheet, type PdfFilterType } from "@amodeo/proclaimer/feature/group";
import { publisherCollection, type Publisher } from "@amodeo/proclaimer/feature/publisher";
import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { PDFIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/pdf/PDFIconButton";
import { reorganisedGroupCollection } from "../../../../collections/reorganised-group.ts";
import { getMemberIdsByGroup } from "../../../../utils/reorganised-groups.ts";
import type { ReorganisedGroup } from "../../../../schemas/reorganised-group.ts";

export function DownloadPdfButton() {
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [is_generating, set_is_generating] = useState(false);
  const congregation = getStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: groups_data } = useLiveQuery((q) =>
    q.from({ g: reorganisedGroupCollection }).orderBy(({ g }) => g.name),
  );

  const { data: publishers_data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const groups = (groups_data ?? []).filter(
    (g) => g.congregation_id === congregation_id,
  ) as ReorganisedGroup[];
  const publishers = (publishers_data ?? []).filter(
    (p) => p.congregation_id === congregation_id,
  ) as Publisher[];

  if (groups.length === 0) {
    return null;
  }

  const handle_download = async (filter_type: PdfFilterType) => {
    set_is_generating(true);
    set_is_modal_open(false);

    try {
      const file_name = congregation?.name
        ? `${congregation.name.replace(/\s+/g, "_")}_Reorganised_Groups_${filter_type}.pdf`
        : `Reorganised_Groups_${filter_type}.pdf`;

      const blob = await pdf(
        <GroupsPdf
          groups={groups}
          publishers={publishers}
          congregation_name={congregation?.name}
          filter_type={filter_type}
          member_ids_by_group={getMemberIdsByGroup(groups)}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file_name;
      document.body.appendChild(link);
      try {
        link.click();
      } finally {
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      set_is_generating(false);
    }
  };

  return (
    <>
      <PDFIconButton
        fill="clear"
        disabled={is_generating}
        on_click={() => set_is_modal_open(true)}
      />

      <PdfActionSheet
        is_open={is_modal_open}
        on_select={handle_download}
        on_dismiss={() => set_is_modal_open(false)}
      />
    </>
  );
}
