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
import { NameForm } from './NameForm';
import { useRXdb, useSettings } from '@data';
import { usePublishers } from '../_hooks/usePublishers';

export const NameEditModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { congregation_id } = useSettings.use.settings();
  const upsertPublisher: any = usePublishers.use.upsertPublisher();
  const rxdb = useRXdb.use.rxdb();

  const handleUpdate = async () => {
    upsertPublisher(rxdb, congregation_id);
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
          <NameForm></NameForm>
        </IonContent>
      </IonModal>
    </>
  );
};

export default NameEditModal;
