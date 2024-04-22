import { IonItem, IonList } from '@ionic/react';
import { SPEAKERS } from '../helper/publicTalkData';
import { useSchedule } from '../../global/hooks/useSchedule';

export const SelectSpeaker = ({ closeModal }: any) => {
  const setScheduleProperty = useSchedule.use.setScheduleProperty();

  const onSelect = (speaker: string) => {
    setScheduleProperty('weSpeaker', speaker);
    closeModal();
  };

  return (
    <IonList inset>
      {SPEAKERS.map((speaker) => {
        return (
          <IonItem onClick={() => onSelect(speaker.text)} key={speaker.text}>
            {speaker.text}
          </IonItem>
        );
      })}
    </IonList>
  );
};
