import { IonItem, IonList } from '@ionic/react';
import { CHAIRMEN } from '../helper/publicTalkData';
import { useSchedule } from '../../schedules/hooks/useSchedule';

export const SelectChairman = ({ closeModal }: any) => {
  const setScheduleProperty = useSchedule.use.setScheduleProperty();

  const onSelect = (chairman: string) => {
    setScheduleProperty('weChairman', chairman);
    closeModal();
  };

  return (
    <IonList inset>
      {CHAIRMEN.map((chairman) => {
        return (
          <IonItem onClick={() => onSelect(chairman.text)} key={chairman.text}>
            {chairman.text}
          </IonItem>
        );
      })}
    </IonList>
  );
};
