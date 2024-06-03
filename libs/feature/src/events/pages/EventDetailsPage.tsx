import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Spinner } from '@ui';
import { Suspense, useEffect } from 'react';
import { EventDetails } from '../components/EventDetails';
import { useEvents } from '../hooks/useEvents';
import EventFormModal from '../modals/EventFormModal';

export const EventDetailsPage = ({ match }: any) => {
  const setEvent = useEvents.use.setEvent();
  const resetEvent = useEvents.use.resetEvent();

  useEffect(() => {
    setEvent(match.params.id);

    return () => {
      resetEvent();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Event Details</IonTitle>
          <IonButtons slot="end">
            <EventFormModal></EventFormModal>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <EventDetails></EventDetails>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default EventDetailsPage;
