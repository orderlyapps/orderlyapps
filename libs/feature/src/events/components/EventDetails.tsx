import { IonItem, IonLabel, IonList } from '@ionic/react';
import { useEvents } from '../hooks/useEvents';

export const EventDetails = () => {
  const event = useEvents.use.event();
  return (
    <IonList>
      <IonItem>
        <IonLabel>Name</IonLabel>
        {event.name}
      </IonItem>
    </IonList>
  );
};
