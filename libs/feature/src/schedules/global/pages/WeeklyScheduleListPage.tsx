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
import { WeekList } from '../components/WeekList';

export const WeeklyScheduleListPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Weekly Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <WeekList></WeekList> 
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default WeeklyScheduleListPage;
