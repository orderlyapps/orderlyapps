import { useState } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { Body } from "@amodeo/proclaimer/ui/components/display/text/body/Body";
import { useAvParticipantPublishers } from "../../../../hooks/use-av-participant-publishers.ts";
import type { AvParticipation } from "../../../../schemas/av-participation.ts";

interface AddAvParticipantModalProps {
  participation_id: AvParticipation["participation_id"];
  modal_title: string;
  is_open: boolean;
  on_dismiss: () => void;
}

export function AddAvParticipantModal({
  participation_id,
  modal_title,
  is_open,
  on_dismiss,
}: AddAvParticipantModalProps) {
  const { nonParticipantPublishers, addParticipant, isLoading } =
    useAvParticipantPublishers(participation_id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPublishers = nonParticipantPublishers.filter(
    ({ publisher, display_name }) =>
      publisher.id && display_name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  function handleDismiss() {
    setSearchQuery("");
    on_dismiss();
  }

  function handleSelect(publisher_id: string) {
    addParticipant(publisher_id);
    handleDismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add {modal_title}</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={handleDismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
            debounce={100}
            placeholder="Search names"
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <IonItem key={i}>
                <IonLabel>
                  <IonSkeletonText style={{ width: "60%" }} />
                </IonLabel>
              </IonItem>
            ))
          ) : filteredPublishers.length === 0 ? (
            <IonItem>
              <IonLabel>
                <Body color="medium">
                  {searchQuery.trim() ? "No matching publishers." : "No available publishers."}
                </Body>
              </IonLabel>
            </IonItem>
          ) : (
            filteredPublishers.map(({ publisher, display_name }) => (
              <IonItem key={publisher.id} button onClick={() => handleSelect(publisher.id ?? "")}>
                <IonLabel>{display_name}</IonLabel>
              </IonItem>
            ))
          )}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
