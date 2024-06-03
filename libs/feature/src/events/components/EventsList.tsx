import { IonItem, IonList } from '@ionic/react';
import { useEvents } from '../hooks/useEvents';
import { useSettings } from '@data';
import { useEffect } from 'react';

export const EventsList = () => {
  const { congregation_id } = useSettings.use.settings();
  const events = useEvents.use.events();
  const fetchEvents = useEvents.use.fetchEvents();

  useEffect(() => {
    fetchEvents(congregation_id);
  }, []);

  return (
    <IonList>
      {events?.map((event, index) => (
        <IonItem
          key={index}
          routerLink={'/home/events/details/' + event.id}
        >
          {event.name}
        </IonItem>
      ))}
    </IonList>
  );
};
