import {
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useEvents } from '../hooks/useEvents';

export const EventCircuitAssembly = () => {
  const event = useEvents.use.event();
  const updateEventProperties = useEvents.use.updateEventProperties();
  const onInput = (e: any) =>
    updateEventProperties({ [e.target.name]: e.target.value });

  return (
    <>
      <IonItem>
        <IonInput
          label="Theme"
          value={event?.name || ''}
          name="name"
          onIonInput={onInput}
          clearInput={true}
          className={'ion-text-end'}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonSelect
          label="With"
          name="description"
          onIonChange={onInput}
          className="ion-text-end"
          interface="popover"
        >
          <IonSelectOption value="CO">Circuit Overseer</IonSelectOption>
          <IonSelectOption value="BR">Branch Representative</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonLabel>Date</IonLabel>
        <IonDatetimeButton datetime="datetime2"></IonDatetimeButton>
      </IonItem>

      <IonModal keepContentsMounted={true}>
        <IonDatetime
          id="datetime2"
          value={event.start_date}
          name="start_date"
          onIonChange={onInput}
          presentation="date"
          preferWheel
        ></IonDatetime>
      </IonModal>
    </>
  );
};
