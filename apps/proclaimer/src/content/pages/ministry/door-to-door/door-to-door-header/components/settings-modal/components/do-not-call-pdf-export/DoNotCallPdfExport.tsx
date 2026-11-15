import { useState } from "react";
import { IonItem, IonLabel, IonText, useIonAlert } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { pdf } from "@react-pdf/renderer";
import { downloadOutline, shareOutline } from "ionicons/icons";
import { TextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/TextButton";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { usePermissions } from "@amodeo/proclaimer/feature/permission";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import {
  doNotCallCollection,
  streetCollection,
  suburbCollection,
} from "@amodeo/proclaimer/feature/territory";
import { DoNotCallPdf, type DoNotCall } from "@amodeo/proclaimer/feature/map";

function compareDoNotCalls(a: DoNotCall, b: DoNotCall): number {
  const street = a.street.localeCompare(b.street);
  if (street !== 0) return street;
  const house = a.house_number.localeCompare(b.house_number, undefined, { numeric: true });
  if (house !== 0) return house;
  return (a.unit_number ?? "").localeCompare(b.unit_number ?? "", undefined, { numeric: true });
}

export function DoNotCallPdfExport() {
  const [presentAlert] = useIonAlert();
  const [is_generating, set_is_generating] = useState(false);
  const { has_service_overseer, has_congregation_admin, is_super_admin } = usePermissions();
  const congregation = useStoredCongregation();

  const { data } = useLiveQuery((q) =>
    q
      .from({ dnc: doNotCallCollection })
      .join({ st: streetCollection }, ({ st, dnc }) => eq(st.id, dnc.street_id))
      .join({ sb: suburbCollection }, ({ sb, dnc }) => eq(sb.id, dnc.suburb_id))
      .select(({ dnc, st, sb }) => ({
        ...dnc,
        street: st?.name ?? "",
        suburb: sb?.name ?? "",
      })),
  ) as { data: DoNotCall[] | undefined };

  const can_export = has_service_overseer || has_congregation_admin || is_super_admin;
  const do_not_calls = (data ?? [])
    .filter((dnc) => dnc.congregation_id === congregation?.id)
    .sort(compareDoNotCalls);

  if (!can_export || do_not_calls.length === 0) return null;

  const filename = congregation?.name
    ? `${congregation.name.replace(/\s+/g, "_")}_Do_Not_Calls.pdf`
    : "Do_Not_Calls.pdf";

  const generate_pdf = () =>
    pdf(
      <DoNotCallPdf do_not_calls={do_not_calls} congregation_name={congregation?.name} />,
    ).toBlob();

  const download_blob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    try {
      link.click();
    } finally {
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  const handle_download = async () => {
    set_is_generating(true);
    try {
      const blob = await generate_pdf();
      download_blob(blob);
    } catch (err) {
      void presentAlert({
        header: "Export Failed",
        message: err instanceof Error ? err.message : "An unexpected error occurred.",
        buttons: ["OK"],
      });
    } finally {
      set_is_generating(false);
    }
  };

  const handle_share = async () => {
    set_is_generating(true);
    try {
      const blob = await generate_pdf();
      const file = new File([blob], filename, { type: "application/pdf" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: filename });
      } else {
        download_blob(blob);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      void presentAlert({
        header: "Share Failed",
        message: err instanceof Error ? err.message : "An unexpected error occurred.",
        buttons: ["OK"],
      });
    } finally {
      set_is_generating(false);
    }
  };

  return (
    <>
      <IonItem lines="none">
        <IonLabel>
          <h3>Do Not Call List</h3>
          <IonText color="medium">
            <p>Share or download a PDF list of all do not calls.</p>
          </IonText>
        </IonLabel>
      </IonItem>
      <Space size="md" />
      <TextButton
        icon={shareOutline}
        color="primary"
        fill="outline"
        disabled={is_generating}
        label={is_generating ? "Generating..." : `Share ${do_not_calls.length} Do Not Calls`}
        on_click={handle_share}
      />
      <Space size="md" />
      <TextButton
        icon={downloadOutline}
        color="medium"
        fill="outline"
        disabled={is_generating}
        label={is_generating ? "Generating..." : "Download PDF"}
        on_click={handle_download}
      />
    </>
  );
}
