import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "../../../../../../../../ui/components/display/responsive-modal/ResponsiveModal.tsx";
import { CloseIconButton } from "../../../../../../../../ui/components/inputs/button/icon/close/CloseIconButton.tsx";
import { DeleteTextButton } from "../../../../../../../../ui/components/inputs/button/text/delete/DeleteTextButton.tsx";
import type { EmergencyContact } from "../../../../../../index.ts";
import { Space } from "../../../../../../../../ui/components/layout/space/Space.tsx";
import { useEmergencyContactForm } from "../../_hooks/use-emergency-contact-form.ts";
import { EmergencyContactForm } from "./_components/emergency-contact-form/emergency-contact-form.tsx";

type Contact = NonNullable<EmergencyContact>[number];

interface Props {
  is_open: boolean;
  on_dismiss: () => void;
  publisher_id: string;
  contact?: Contact | null;
}

export function EmergencyContactModal({ is_open, on_dismiss, publisher_id, contact }: Props) {
  const form = useEmergencyContactForm(is_open, contact, publisher_id, on_dismiss);

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{contact ? "Edit" : "Add"} Emergency Contact</IonTitle>
          <IonButtons slot="start">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton strong disabled={!form.is_valid} onClick={form.submit}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <EmergencyContactForm
          first_name={form.first_name}
          last_name={form.last_name}
          relationship={form.relationship}
          phones={form.phones}
          on_first_name={form.set_first_name}
          on_last_name={form.set_last_name}
          on_relationship={form.set_relationship}
          on_phones={form.set_phones}
        />
        <Space size="lg" />
        {contact && (
          <DeleteTextButton
            label="Delete Contact"
            alert_header="Delete Emergency Contact"
            alert_message={`Delete ${contact.first_name} ${contact.last_name}?`}
            on_click={form.remove}
          />
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
