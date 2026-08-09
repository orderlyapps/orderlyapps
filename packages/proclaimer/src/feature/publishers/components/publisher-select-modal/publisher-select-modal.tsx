import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import type { PublisherRecord } from "../../publisher-schema.js";
import type { PublisherFilterNode, PublisherOrderBy } from "../../hooks/use-publishers.js";
import { PublisherSelectList } from "./components/publisher-select-list/publisher-select-list.js";

export interface PublisherSelectModalProps {
  isOpen: boolean;
  selectedId?: string | null;
  title?: string;
  filter?: PublisherFilterNode | PublisherFilterNode[];
  orderBy?: PublisherOrderBy[];
  onDismiss: () => void;
  onSelect: (publisher: PublisherRecord) => void;
}

export function PublisherSelectModal({
  isOpen,
  selectedId,
  title = "Select Publisher",
  filter,
  orderBy,
  onDismiss,
  onSelect,
}: PublisherSelectModalProps) {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PublisherSelectList
          selectedId={selectedId}
          filter={filter}
          orderBy={orderBy}
          onSelect={onSelect}
        />
      </IonContent>
    </IonModal>
  );
}
