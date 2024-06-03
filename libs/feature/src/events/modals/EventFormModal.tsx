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
import { EventForm } from '../components/EventForm';
import { useEvents } from '../hooks/useEvents';
import { useSettings } from '@data';

export const EventFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const event = useEvents.use.event();
  const upsertEvent = useEvents.use.upsertEvent();
  const { congregation_id } = useSettings.use.settings();

  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleDone = () => {
    upsertEvent(congregation_id);

    setIsOpen(false);
  };

  return (
    <>
      <IonButton onClick={() => setIsOpen(true)}>
        <strong>{event.id ? 'Edit' : 'Add'}</strong>
      </IonButton>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleCancel}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>{event.id ? 'Edit Event' : 'Add Event'}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleDone}>Done</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <EventForm></EventForm>
        </IonContent>
      </IonModal>
    </>
  );
};

export default EventFormModal;
