import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { ContactForm } from './ContactForm';
import { useRXdb, useSettings } from '@data';
import { usePublishers } from '../_hooks/usePublishers';
import { upsertPublisher } from '../_helper/upsertPublisher';

export const ContactEditModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { congregation_id } = useSettings.use.settings();
  const publisher: any = usePublishers.use.publisher();

  const rxdb = useRXdb.use.rxdb();

  const handleUpdate = async () => {
    const newPublisherList = await upsertPublisher(
      rxdb,
      publisher,
      congregation_id
    );
    setIsOpen(false);
  };

  return (
    <>
      <IonButton onClick={() => setIsOpen(true)}>
        <strong>Edit</strong>
      </IonButton>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Name</IonTitle>
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={handleUpdate}>
                <strong>Done</strong>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <ContactForm></ContactForm>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ContactEditModal;
