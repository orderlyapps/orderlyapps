import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Dispatch, SetStateAction } from 'react';
import { WeekendMeetingForm } from '../../public-talks/components/WeekendMeetingForm';
import { useSchedule } from '../hooks/useSchedule';
import { useRxDB } from '@data';
import { formatDate } from '@util';

export const EditWeeklyScheduleModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const schedule = useSchedule.use.schedule();
  const db: any = useRxDB();

  const handleUpdate = async () => {
    const result = await db.schedule.upsert({
      ...schedule,
      id: schedule.id.toString(),
    });
    setIsOpen(false);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {formatDate(parseInt(schedule.id)).theocraticWeek}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <WeekendMeetingForm></WeekendMeetingForm>
          <IonButton
            expand="block"
            className="ion-padding"
            onClick={handleUpdate}
          >
            Update
          </IonButton>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default EditWeeklyScheduleModal;
