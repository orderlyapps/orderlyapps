import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import type { PublisherWithMissingDetails } from "../../../../hooks/use-missing-details/use-missing-details.ts";

interface MissingDetailsModalProps {
  entry: PublisherWithMissingDetails;
  isOpen: boolean;
  onClose: () => void;
}

function getPublisherName(entry: PublisherWithMissingDetails): string {
  const { publisher } = entry;
  const first = publisher.display_name || publisher.first_name;
  const middle = publisher.middle_name ?? "";
  return middle ? `${publisher.last_name}, ${first} ${middle}` : `${publisher.last_name}, ${first}`;
}

export function MissingDetailsModal({ entry, isOpen, onClose }: MissingDetailsModalProps) {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{getPublisherName(entry)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent />
    </IonModal>
  );
}
