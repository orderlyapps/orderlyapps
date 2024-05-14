import { useSettings } from '@data';
import {
  IonButton,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useEvents } from '../hooks/useEvents';
import { EventAddCircuitAssembly } from './EventAddCircuitAssembly';
import { onInput } from './onInput';
import { EventAddCOVisit } from './EventAddCOVisit';

export const EventAdd = () => {
  const { congregation_id } = useSettings.use.settings();
  const event = useEvents.use.event();
  const upsertEvent = useEvents.use.upsertEvent();
  const resetEvent = useEvents.use.resetEvent();
  const updateEventProperties = useEvents.use.updateEventProperties();

  const onInput = (e: any) => {
    resetEvent();
    updateEventProperties({ [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    upsertEvent(congregation_id);
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
          >
            <IonSelectOption value="CA">Circuit Assembly</IonSelectOption>
            <IonSelectOption value="CO">Circuit Overseer Visit</IonSelectOption>
            <IonSelectOption value="RC">Regional Convention</IonSelectOption>
            <IonSelectOption value="ME">Memorial</IonSelectOption>
            <IonSelectOption value="OT">Other</IonSelectOption>
          </IonSelect>
        </IonItem>

        {event.type === 'CA' && (
          <EventAddCircuitAssembly></EventAddCircuitAssembly>
        )}

        {event.type == 'CO' && <EventAddCOVisit></EventAddCOVisit>}

        {event.type && (
          <IonButton expand="block" onClick={handleAdd} className="ion-padding">
            Add
          </IonButton>
        )}
      </IonList>
    </>
  );
};
