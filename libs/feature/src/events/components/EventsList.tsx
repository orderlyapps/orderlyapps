import { IonButton, IonItem, IonList } from '@ionic/react';
import { useEvents } from '../hooks/useEvents';
import { supabase } from '@data';

export const EventsList = () => {
  const events = useEvents.use.events();

  const handleDeleteEvent = async (event_id: string) => {
    let { data, error } = await supabase.rpc('get_events', {
      congregation_id: 'b849216a-a104-4be6-923f-97bd3462888f',
    });
    if (error) console.error(error);
    else console.log(data);
  };

  const handleClick = () => {
    console.log('🚀 ~ handleClick ~ events:', events);
  };

  return (
    <IonList>
      <IonItem>
        <IonButton onClick={handleClick}>EventsList</IonButton>
      </IonItem>

      {events?.map((event, index) => (
        <IonItem
          key={index}
          // onClick={() => handleDeleteEvent(event.event_id)}
          routerLink={'/home/events/details/' + event.event_id}
        >
          {event.name}
        </IonItem>
      ))}
    </IonList>
  );
};
