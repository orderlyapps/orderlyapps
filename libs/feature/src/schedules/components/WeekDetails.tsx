import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import { useSchedule } from '../hooks/useSchedule';
import { PUBLIC_TALK_THEMES } from '../../public-talks/helper/publicTalkData';
import { TalkPicker } from '../../public-talks/TalkPicker';

export const WeekDetails = () => {
  const details = useSchedule.use.schedule();

  return (
    <IonList inset>
      <IonListHeader>
        <IonLabel>Weekend Meeting</IonLabel>
      </IonListHeader>

      <TalkPicker></TalkPicker>

      {/* <IonItem>
        <IonLabel>Speaker</IonLabel>
        {details.weSpeaker}
      </IonItem>

      <IonItem lines={details.weTheme ? 'none' : 'full'}>
        <IonLabel>Theme</IonLabel>
        {details.weTheme ? 'No. ' : ''} {details.weTheme}
      </IonItem>

      {details.weTheme && (
        <IonItem>
          <IonLabel></IonLabel>
          {PUBLIC_TALK_THEMES[details.weTheme - 1]?.title || ''}
        </IonItem>
      )} */}

      {/* <IonItem>
        <IonLabel>Chairman</IonLabel>
        {details.weChairman}
      </IonItem>

      <IonItem>
        <IonLabel>Reader</IonLabel>
        {details.weReader}
      </IonItem> */}
    </IonList>
  );
};
