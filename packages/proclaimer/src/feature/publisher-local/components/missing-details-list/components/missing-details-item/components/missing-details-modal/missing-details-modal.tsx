import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PublisherLocalDetails } from "../../../../../publisher-local-details/publisher-local-details.tsx";
import type { PublisherLocal } from "../../../../../../schemas/publisher-local.ts";
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

function getPublisherLocal(entry: PublisherWithMissingDetails): PublisherLocal {
  const publisher_id = entry.publisher.id ?? "";
  if (entry.local) return entry.local;
  return {
    publisher_id,
    confidential_id: "",
    phone: [],
    address: [],
    email: [],
    emergency_contact: [],
    photo: [],
    version: { created_by: "", updated_by: "", created_at: 0, updated_at: 0 },
  };
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
      <IonContent>
        <PublisherLocalDetails publisher={getPublisherLocal(entry)} />
      </IonContent>
    </IonModal>
  );
}
