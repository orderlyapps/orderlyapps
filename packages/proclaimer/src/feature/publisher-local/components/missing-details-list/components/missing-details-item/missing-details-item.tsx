import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import type { PublisherWithMissingDetails } from "../../hooks/use-missing-details/use-missing-details.ts";

interface MissingDetailsItemProps {
  entry: PublisherWithMissingDetails;
}

function getPublisherName(entry: PublisherWithMissingDetails): string {
  const { publisher } = entry;
  const first = publisher.display_name || publisher.first_name;
  const middle = publisher.middle_name ?? "";
  return middle ? `${publisher.last_name}, ${first} ${middle}` : `${publisher.last_name}, ${first}`;
}

export function MissingDetailsItem({ entry }: MissingDetailsItemProps) {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <IonItem lines="full" button detail onClick={() => set_is_open(true)}>
        <IonLabel className="ion-text-wrap">
          <h2>{getPublisherName(entry)}</h2>
        </IonLabel>
      </IonItem>

      <IonModal isOpen={is_open} onDidDismiss={() => set_is_open(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{getPublisherName(entry)}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => set_is_open(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent />
      </IonModal>
    </>
  );
}
