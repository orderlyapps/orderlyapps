import { IonItem, IonLabel } from '@ionic/react';
import { useEvents } from '../hooks/useEvents';
import { WeekPicker } from '../../schedules/_main/WeekPicker';

export const EventCOVisit = () => {
  const event = useEvents.use.event();
  const updateEventProperties = useEvents.use.updateEventProperties();
  const onInput = (e: any) => {
    updateEventProperties({ [e.target.name]: e.target.value });
  };

  return (
    <>
      <IonItem>
        <IonLabel>Week</IonLabel>
        <WeekPicker onSelect={onInput} name={'start_date'}></WeekPicker>
      </IonItem>
    </>
  );
};
