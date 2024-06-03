import {
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption
} from '@ionic/react';
import { useEvents } from '../hooks/useEvents';
import { EventCircuitAssembly } from './EventCircuitAssembly';
import { EventCOVisit } from './EventCOVisit';

export const EventForm = () => {
  const event = useEvents.use.event();
  const resetEvent = useEvents.use.resetEvent();
  const updateEventProperties = useEvents.use.updateEventProperties();

  const onInput = (e: any) => {
    resetEvent();
    updateEventProperties({ [e.target.name]: e.target.value });
  };

  return (
    <>
      <IonList inset>
        <IonItem>
          <IonSelect
            label="Type"
            name="type"
            onIonChange={onInput}
            className="ion-text-end"
            interface="popover"
            value={event.type}
          >
            <IonSelectOption value="CA">Circuit Assembly</IonSelectOption>
            <IonSelectOption value="CO">Circuit Overseer Visit</IonSelectOption>
            <IonSelectOption value="RC">Regional Convention</IonSelectOption>
            <IonSelectOption value="ME">Memorial</IonSelectOption>
            <IonSelectOption value="OT">Other</IonSelectOption>
          </IonSelect>
        </IonItem>

        {event.type === 'CA' && (
          <EventCircuitAssembly></EventCircuitAssembly>
        )}

        {event.type == 'CO' && <EventCOVisit></EventCOVisit>}
      </IonList>
    </>
  );
};
