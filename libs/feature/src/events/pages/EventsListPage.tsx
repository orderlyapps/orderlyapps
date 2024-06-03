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
import { Suspense } from 'react';
import { EventsList } from '../components/EventsList';
import EventFormModal from '../modals/EventFormModal';

export const EventsListPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Events</IonTitle>
          <IonButtons slot="end">
            <EventFormModal></EventFormModal>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <EventsList></EventsList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default EventsListPage;
