import { IonLabel, IonList, IonListHeader } from '@ionic/react';
import { PublicTalkDetails } from './PublicTalkDetails';
import EditWeekendMeetingModal from './EditWeekendMeetingModal';

export const WeekendMeetingDetails = () => {
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Weekend Meeting</IonLabel>
        <EditWeekendMeetingModal></EditWeekendMeetingModal>
      </IonListHeader>
      <PublicTalkDetails></PublicTalkDetails>
    </IonList>
  );
};
