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
import { EventAdd } from '../components/EventAdd';
import { EventsList } from '../components/EventsList';

export const EventsListPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <EventsList></EventsList>
          <EventAdd></EventAdd>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default EventsListPage;
