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
import { Suspense, lazy, useEffect } from 'react';
import { useSettings } from '@data';
import { formatDate } from '@util';
import { useWeek } from '../_hooks/useWeek';
const WeekendMeetingDetails = lazy(() => import('./WeekendMeetingDetails'));

export const WeekDetailsPage = ({ match }: any) => {
  const { congregation_id } = useSettings.use.settings();
  const fetchWeek = useWeek.use.fetchWeek();

  useEffect(() => {
    fetchWeek(congregation_id, match.params.week_id);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{formatDate(match.params.week_id)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <WeekendMeetingDetails></WeekendMeetingDetails>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default WeekDetailsPage;
