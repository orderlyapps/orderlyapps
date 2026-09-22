import { useState } from "react";
import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ModalSelect } from "@amodeo/proclaimer/ui/components/inputs/modal-select/ModalSelect";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { PublisherSelectContent } from "@amodeo/proclaimer/feature/settings";
import { getStoredPublisher, getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";

interface PdfPublisherSelectProps {
  on_change: (publisher: Publisher | null) => void;
}

export function PdfPublisherSelect({ on_change }: PdfPublisherSelectProps) {
  const [show_select_modal, set_show_select_modal] = useState(false);
  const [publisher, set_publisher] = useState(getStoredPublisher);

  const handleSelect = (p: Publisher) => {
    set_publisher(p);
    on_change(p);
    set_show_select_modal(false);
  };

  return (
    <>
      <ModalSelect
        label="Publisher"
        display_value={publisher ? getPublisherDisplayName(publisher) : ""}
        placeholder="Select publisher..."
        on_open={() => set_show_select_modal(true)}
      />
      <ResponsiveModal isOpen={show_select_modal} onDidDismiss={() => set_show_select_modal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Select Publisher</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton on_click={() => set_show_select_modal(false)} skip_confirmation />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding content-wide">
          <PublisherSelectContent
            onPublisherSelected={handleSelect}
            selectedPublisherId={publisher?.id}
          />
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
