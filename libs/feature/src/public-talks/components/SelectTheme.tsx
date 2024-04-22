import { IonItem, IonList } from '@ionic/react';
import { PUBLIC_TALK_THEMES_OPTIONS } from '../helper/publicTalkData';
import { useSchedule } from '../../global/hooks/useSchedule';

export const SelectTheme = ({ closeModal }: any) => {
  const setScheduleProperty = useSchedule.use.setScheduleProperty();

  const onSelect = (theme: number) => {
    setScheduleProperty('weTheme', theme);
    closeModal();
  };

  return (
    <IonList inset>
      {PUBLIC_TALK_THEMES_OPTIONS.map((theme) => {
        return (
          <IonItem onClick={() => onSelect(theme.value)} key={theme.value}>
            {theme.text}
          </IonItem>
        );
      })}
    </IonList>
  );
};
