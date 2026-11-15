import { useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { pdf } from "@react-pdf/renderer";
import { isValid } from "date-fns";
import { downloadOutline, shareOutline } from "ionicons/icons";
import {
  doNotCallCollection,
  formatAddressNumber,
  streetCollection,
  suburbCollection,
} from "@amodeo/proclaimer/feature/territory";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { DoNotCallPdf, type DoNotCall } from "@amodeo/proclaimer/feature/map";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { PDFIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/pdf/PDFIconButton";
import { DateInput } from "@amodeo/proclaimer/ui/components/inputs/date/DateInput";
import { TextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/TextButton";
import { SaveTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/save/SaveTextButton";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";

type SortMode = "date" | "suburb" | "street";

const collator = new Intl.Collator(undefined, { numeric: true });

function createdAtTime(iso: string | undefined): number {
  if (!iso) return 0;
  const time = new Date(iso).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function compareAddress(a: DoNotCall, b: DoNotCall): number {
  return (
    collator.compare(a.house_number, b.house_number) ||
    collator.compare(a.unit_number ?? "", b.unit_number ?? "")
  );
}

function compareDoNotCalls(sort_mode: SortMode) {
  return (a: DoNotCall, b: DoNotCall): number => {
    if (sort_mode === "suburb") {
      return (
        collator.compare(a.suburb, b.suburb) ||
        collator.compare(a.street, b.street) ||
        compareAddress(a, b)
      );
    }
    if (sort_mode === "street") {
      return (
        collator.compare(a.street, b.street) ||
        compareAddress(a, b) ||
        collator.compare(a.suburb, b.suburb)
      );
    }
    return createdAtTime(a.created_at) - createdAtTime(b.created_at);
  };
}

function formatAddress(dnc: DoNotCall): string {
  return `${formatAddressNumber(dnc)} ${dnc.street}, ${dnc.suburb}`;
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (!isValid(date)) return "—";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function toDateInputValue(iso: string | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (!isValid(date)) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function DoNotCallsPage() {
  const congregation = useStoredCongregation();
  const [presentAlert] = useIonAlert();
  const [editing, set_editing] = useState<DoNotCall | null>(null);
  const [date_value, set_date_value] = useState("");
  const [sort_mode, set_sort_mode] = useState<SortMode>("date");
  const [search, set_search] = useState("");
  const [is_export_open, set_is_export_open] = useState(false);
  const [export_sort, set_export_sort] = useState<SortMode>("date");
  const [is_generating, set_is_generating] = useState(false);

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

  const normalized_search = search.trim().toLowerCase();
  const congregation_do_not_calls = (data ?? []).filter(
    (dnc) => dnc.congregation_id === congregation?.id,
  );
  const do_not_calls = congregation_do_not_calls
    .filter(
      (dnc) =>
        !normalized_search ||
        formatAddress(dnc).toLowerCase().includes(normalized_search) ||
        (dnc.notes ?? "").toLowerCase().includes(normalized_search),
    )
    .sort(compareDoNotCalls(sort_mode));

  const filename = congregation?.name
    ? `${congregation.name.replace(/\s+/g, "_")}_Do_Not_Calls.pdf`
    : "Do_Not_Calls.pdf";

  const generatePdf = () =>
    pdf(
      <DoNotCallPdf
        do_not_calls={[...congregation_do_not_calls].sort(compareDoNotCalls(export_sort))}
        congregation_name={congregation?.name}
      />,
    ).toBlob();

  const downloadBlob = (blob: Blob) => {
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

  async function handleDownload() {
    set_is_generating(true);
    try {
      downloadBlob(await generatePdf());
    } catch (err) {
      void presentAlert({
        header: "Export Failed",
        message: err instanceof Error ? err.message : "An unexpected error occurred.",
        buttons: ["OK"],
      });
    } finally {
      set_is_generating(false);
    }
  }

  async function handleShare() {
    set_is_generating(true);
    try {
      const blob = await generatePdf();
      const file = new File([blob], filename, { type: "application/pdf" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: filename });
      } else {
        downloadBlob(blob);
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
  }

  function handleEdit(dnc: DoNotCall) {
    set_editing(dnc);
    set_date_value(toDateInputValue(dnc.created_at));
  }

  function handleClose() {
    set_editing(null);
  }

  function handleSave() {
    if (!editing?.id || !date_value) return;
    const [year, month, day] = date_value.split("-").map(Number);
    const previous = editing.created_at ? new Date(editing.created_at) : null;
    const next = previous && isValid(previous) ? previous : new Date();
    next.setFullYear(year, month - 1, day);
    doNotCallCollection.update(editing.id, (draft) => {
      draft.created_at = next.toISOString();
    });
    handleClose();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Do Not Calls</IonTitle>
          <IonButtons slot="end">
            <PDFIconButton
              disabled={is_generating || congregation_do_not_calls.length === 0}
              on_click={() => {
                set_export_sort(sort_mode);
                set_is_export_open(true);
              }}
            />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={search}
            onIonInput={(e) => set_search(e.detail.value ?? "")}
            placeholder="Search address or notes"
            debounce={0}
          />
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            value={sort_mode}
            onIonChange={(e) => set_sort_mode(e.detail.value as SortMode)}
            scrollable
          >
            <IonSegmentButton value="date">
              <IonLabel>Date</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="suburb">
              <IonLabel>Suburb</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="street">
              <IonLabel>Street</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <IonList>
          {do_not_calls.length === 0 && (
            <IonItem>
              <IonLabel className="ion-text-center">
                <p>{normalized_search ? "No matching do not calls." : "No do not calls."}</p>
              </IonLabel>
            </IonItem>
          )}
          {do_not_calls.map((dnc) => (
            <IonItem key={dnc.id} button detail onClick={() => handleEdit(dnc)}>
              <IonLabel>
                <h2>{formatAddress(dnc)}</h2>
                {dnc.notes && <p>{dnc.notes}</p>}
              </IonLabel>
              <IonNote slot="end">{formatDate(dnc.created_at)}</IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <ResponsiveModal
        isOpen={is_export_open}
        onDidDismiss={() => set_is_export_open(false)}
        fullscreen={false}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Export Do Not Call List</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton on_click={() => set_is_export_open(false)} skip_confirmation />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonListHeader>
              <IonLabel>Sort order</IonLabel>
            </IonListHeader>
            <IonSegment
              value={export_sort}
              onIonChange={(e) => set_export_sort(e.detail.value as SortMode)}
            >
              <IonSegmentButton value="date">
                <IonLabel>Date</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="suburb">
                <IonLabel>Suburb</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="street">
                <IonLabel>Street</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonList>
          <Space size="md" />
          <IonGrid>
            <IonRow>
              <IonCol>
                <TextButton
                  icon={shareOutline}
                  disabled={is_generating}
                  on_click={() => void handleShare()}
                  label={is_generating ? "Generating..." : "Share"}
                />
              </IonCol>
              <IonCol>
                <TextButton
                  icon={downloadOutline}
                  disabled={is_generating}
                  on_click={() => void handleDownload()}
                  label={is_generating ? "Generating..." : "Download"}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </ResponsiveModal>
      <ResponsiveModal isOpen={!!editing} onDidDismiss={handleClose}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Date</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton on_click={handleClose} skip_confirmation />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <DateInput label="Date" value={date_value} on_change={set_date_value} />
          <Space size="md" />
          <SaveTextButton
            variant="update"
            skip_confirmation
            disabled={!date_value}
            on_click={handleSave}
          />
        </IonContent>
      </ResponsiveModal>
    </IonPage>
  );
}

export default DoNotCallsPage;
