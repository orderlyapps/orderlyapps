import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Spinner } from '@ui';
import { Suspense, useEffect, useState } from 'react';
import { WeekDetails } from '../components/WeekDetails';
import { useSchedule } from '../hooks/useSchedule';
import { useRxDocumentByID } from '@data';
import EditWeeklyScheduleModal from '../modals/EditWeeklyScheduleModal';
import { formatDate } from '@util';

export const WeekDetailsPage = ({ match }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { doc: schedule }: any = useRxDocumentByID('schedule', match.params.id);
  const setSchedule = useSchedule.use.setSchedule();

  useEffect(() => {
    setSchedule({
      weChairman: schedule?.weChairman,
      weSpeaker: schedule?.weSpeaker,
      weReader: schedule?.weReader,
      weTheme: schedule?.weTheme,
      id: match.params.id,
    });
  }, [schedule]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>

          <IonTitle>{formatDate(parseInt(match.params.id)).theocraticWeek}</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(true)}>Edit</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <WeekDetails></WeekDetails>

          <EditWeeklyScheduleModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          ></EditWeeklyScheduleModal>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default WeekDetailsPage;
