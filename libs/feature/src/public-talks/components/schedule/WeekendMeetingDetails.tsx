import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import EditWeekendMeetingModal from './EditWeekendMeetingModal';
import { formatDisplayName } from '../../../publishers/helper/formatDisplayName';
import { getOutline } from '../../helper/getOutline';
import { useStore } from '@data';

export const WeekendMeetingDetails = () => {
  const { schedule } = useStore.use.store();

  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Weekend Meeting</IonLabel>
        <EditWeekendMeetingModal></EditWeekendMeetingModal>
      </IonListHeader>
      <IonItem>
        <IonLabel>Speaker</IonLabel>
        {formatDisplayName(schedule?.publicSpeaker, 'displayName lastName')}
      </IonItem>
      <IonItem>
        <IonLabel>Theme</IonLabel>
        {getOutline(schedule?.outline)}
      </IonItem>
      <IonItem>
        <IonLabel>Chairman</IonLabel>
        {formatDisplayName(schedule?.weekendChairman)}
      </IonItem>
      <IonItem>
        <IonLabel>Reader</IonLabel>
        {formatDisplayName(schedule?.watchtowerReader)}
      </IonItem>
    </IonList>
  );
};

export default WeekendMeetingDetails;
