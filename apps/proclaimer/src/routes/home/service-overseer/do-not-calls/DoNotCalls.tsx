import { useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { isValid } from "date-fns";
import {
  doNotCallCollection,
  streetCollection,
  suburbCollection,
} from "@amodeo/proclaimer/feature/territory";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import type { DoNotCall } from "@amodeo/proclaimer/feature/map";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { DateInput } from "@amodeo/proclaimer/ui/components/inputs/date/DateInput";
import { SaveTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/save/SaveTextButton";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";

function createdAtTime(iso: string | undefined): number {
  if (!iso) return 0;
  const time = new Date(iso).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function compareDoNotCalls(a: DoNotCall, b: DoNotCall): number {
  return createdAtTime(a.created_at) - createdAtTime(b.created_at);
}

function formatAddress(dnc: DoNotCall): string {
  const unit = dnc.unit_number ? `/${dnc.unit_number}` : "";
  return `${dnc.house_number}${unit} ${dnc.street}, ${dnc.suburb}`;
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
  const [editing, set_editing] = useState<DoNotCall | null>(null);
  const [date_value, set_date_value] = useState("");

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

  const do_not_calls = (data ?? [])
    .filter((dnc) => dnc.congregation_id === congregation?.id)
    .sort(compareDoNotCalls);

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
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <IonList>
          {do_not_calls.length === 0 && (
            <IonItem>
              <IonLabel className="ion-text-center">
                <p>No do not calls.</p>
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
