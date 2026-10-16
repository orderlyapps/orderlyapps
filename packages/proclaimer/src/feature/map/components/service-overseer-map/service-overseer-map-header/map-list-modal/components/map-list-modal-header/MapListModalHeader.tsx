import { IonButtons, IonHeader, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { AddIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/add/AddIconButton";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";

type MapListModalHeaderProps = {
  search_query: string;
  on_search_change: (value: string) => void;
  on_close: () => void;
  on_add: () => void;
};

export function MapListModalHeader({
  search_query,
  on_search_change,
  on_close,
  on_add,
}: MapListModalHeaderProps) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <CloseIconButton on_click={on_close} skip_confirmation />
        </IonButtons>
        <IonTitle>Maps</IonTitle>
        <IonButtons slot="end">
          <AddIconButton on_click={on_add} />
        </IonButtons>
      </IonToolbar>
      <IonToolbar>
        <IonSearchbar
          value={search_query}
          onIonInput={(e) => on_search_change(e.detail.value ?? "")}
          debounce={100}
          placeholder="Search maps..."
        />
      </IonToolbar>
    </IonHeader>
  );
}
