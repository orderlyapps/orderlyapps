import { IonItem, IonList } from '@ionic/react';
import { READERS } from '../helper/publicTalkData';
import { useSchedule } from '../../global/hooks/useSchedule';

export const SelectReader = ({ closeModal }: any) => {
  const setScheduleProperty = useSchedule.use.setScheduleProperty();

  const onSelect = (reader: string) => {
    setScheduleProperty('weReader', reader);
    closeModal();
  };

  return (
    <IonList inset>
      {READERS.map((reader) => {
        return (
          <IonItem onClick={() => onSelect(reader.text)} key={reader.text}>
            {reader.text}
          </IonItem>
        );
      })}
    </IonList>
  );
};
