import { IonToolbar, IonTitle, IonButtons, IonBackButton, useIonRouter } from "@ionic/react";
import { AddIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/add/AddIconButton";
import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { reorganisedGroupCollection } from "../../collections/reorganised-group.ts";
import { DownloadPdfButton } from "./components/download-pdf-button/DownloadPdfButton.tsx";

export function ReorganisedGroupsHeader() {
  const router = useIonRouter();

  const handle_add = () => {
    const congregation_id = getStoredCongregation()?.id;
    if (!congregation_id) return;
    const id = crypto.randomUUID();
    reorganisedGroupCollection.insert({
      id,
      congregation_id,
      name: "New Group",
      overseer_id: null,
      assistant_id: null,
      member_ids: [],
    });
    router.push(`/home/secretary/reorganise-groups/${id}`);
  };

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/secretary" />
      </IonButtons>
      <IonTitle>Reorganise Groups</IonTitle>
      <IonButtons slot="end">
        <AddIconButton on_click={handle_add} />
        <DownloadPdfButton />
      </IonButtons>
    </IonToolbar>
  );
}
