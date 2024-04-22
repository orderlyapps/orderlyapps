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
import { useRxDocumentByID, useStore } from '@data';
import { formatDate } from '@util';
import { WeekDetails } from '../components/WeekDetails';
import EditWeeklyScheduleModal from '../modals/EditWeeklyScheduleModal';
import { useSchedule } from '../hooks/useSchedule';
import { WeekendMeetingDetails } from '../../public-talks/WeekendMeetingDetails';
import useSBSchedule from '../hooks/useSBSchedule';
import useSBPublisher from '../../publishers/hooks/useSBPublisher';

export const WeekDetailsPage = ({ match }: any) => {
  // const schedule = useSBSchedule(match.params.id);
  const [isOpen, setIsOpen] = useState(false);
  // console.log('🚀 ~ WeekDetailsPage ~ schedule:', schedule);
  // const speaker = useSBPublisher(schedule?.publicSpeaker);

  const setStoreProperty = useStore.use.setStoreProperty();
  setStoreProperty(
    'week',
    // publicSpeaker: { ...speaker },
    // outline: schedule?.outline || '',
    parseInt(match.params.id)
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>

          <IonTitle>
            {formatDate(parseInt(match.params.id)).theocraticWeek}
          </IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(true)}>Edit</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <WeekendMeetingDetails></WeekendMeetingDetails>
          {/* <WeekDetails></WeekDetails>

          <EditWeeklyScheduleModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          ></EditWeeklyScheduleModal> */}
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default WeekDetailsPage;
