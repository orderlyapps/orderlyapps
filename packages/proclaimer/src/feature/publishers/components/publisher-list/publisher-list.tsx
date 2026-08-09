import { IonItem, IonLabel, IonList, IonSpinner } from "@ionic/react";
import { usePublishers } from "../../hooks/use-publishers.js";
import { PublisherListItem } from "./components/publisher-list-item/publisher-list-item.js";

export function PublisherList() {
  const { data: publishers, isLoading, isError, isConfigured } = usePublishers();

  if (!isConfigured) {
    return (
      <IonList inset>
        <IonItem lines="none">
          <IonLabel color="medium">
            Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env to load publishers
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }

  if (isLoading) {
    return (
      <div className="ion-padding ion-text-center">
        <IonSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <IonList inset>
        <IonItem color="danger">
          <IonLabel>Failed to load publishers</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  const displayedPublishers = publishers;

  return (
    <IonList inset>
      {displayedPublishers.map((publisher) => (
        <PublisherListItem key={publisher.id} publisher={publisher} />
      ))}
      {displayedPublishers.length === 0 && (
        <IonItem lines="none">
          <IonLabel color="medium">No publishers found</IonLabel>
        </IonItem>
      )}
    </IonList>
  );
}
