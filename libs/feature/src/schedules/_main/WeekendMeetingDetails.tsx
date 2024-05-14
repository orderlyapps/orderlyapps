import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import EditWeekendMeetingModal from './EditWeekendMeetingModal';
import { formatDisplayName } from '../../publishers/name/formatDisplayName';
import { useWeek } from '../_hooks/useWeek';
import { getOutline } from '../public-talks/_helper/getOutline';
import { useRXdb } from '@data';
import { getPhoneNumber } from '../../publishers/_helper/getPhoneNumber';

export const WeekendMeetingDetails = () => {
  const week = useWeek.use.week();

  const rxdb = useRXdb.use.rxdb();

  const phoneNumber = async (publisher_id: string) => {
    return await getPhoneNumber(rxdb, publisher_id);
  };

  const handleTextSpeaker = async () => {
    const smsTemplate = `Hi ${
      formatDisplayName(week?.publicSpeaker, 'displayName') || ''
    },\nJust checking you're ok to deliver our public talk this weekend.\n\nCONGREGATION:\nMaitland\n\nTIME:\nSaturday 3pm\n\nTALK: ${
      week?.outline
    }\n${getOutline(
      week?.outline
    )}\n\nIMAGES:\nbencizzio@live.com.au\n\nLOCATION:\n104 Collinson St Tenambit\n\nhttps://www.google.com/maps/place/104+Collinson+St,+Tenambit+NSW+2323/@-32.7422874,151.6109964,17z/data=!3m1!4b1!4m6!3m5!1s0x6b7343f0cf36a71d:0x5c01e549e85da562!8m2!3d-32.7422919!4d151.6135713!16s%2Fg%2F11csnwgb6t?entry=ttu`;

    const smsUri = `sms:${await phoneNumber(
      week?.publicSpeaker_id
    )}?&body=${encodeURIComponent(smsTemplate)}`;
    window.open(smsUri, '_self');
  };

  const handleTextChairman = async () => {
    const smsTemplate = `Hi ${
      formatDisplayName(week?.weekendChairman, 'displayName') || ''
    }, just checking you're ok to be chairman today`;
    const smsUri = `sms:${await phoneNumber(
      week?.weekendChairman_id
    )}?&body=${encodeURIComponent(smsTemplate)}`;
    window.open(smsUri, '_self');
  };

  const handleTextReader = async () => {
    const smsTemplate = `Hi ${
      formatDisplayName(week?.watchtowerReader, 'displayName') || ''
    }, just checking you're ok to be watchtower reader today`;
    const smsUri = `sms:${await phoneNumber(
      week?.watchtowerReader_id
    )}?&body=${encodeURIComponent(smsTemplate)}`;
    window.open(smsUri, '_self');
  };

  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Weekend Meeting</IonLabel>
        <EditWeekendMeetingModal></EditWeekendMeetingModal>
      </IonListHeader>

      <IonItem onClick={handleTextSpeaker}>
        <IonLabel>Speaker</IonLabel>
        {formatDisplayName(week?.publicSpeaker, 'displayName lastName')}
      </IonItem>

      <IonItem>
        <IonLabel>Theme</IonLabel>
        {getOutline(week?.outline)}
      </IonItem>

      <IonItem onClick={handleTextChairman}>
        <IonLabel>Chairman</IonLabel>
        {formatDisplayName(week?.weekendChairman)}
      </IonItem>

      <IonItem onClick={handleTextReader}>
        <IonLabel>Reader</IonLabel>
        {formatDisplayName(week?.watchtowerReader)}
      </IonItem>
    </IonList>
  );
};

export default WeekendMeetingDetails;
