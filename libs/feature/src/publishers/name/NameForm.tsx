import { IonInput, IonItem, IonList } from '@ionic/react';
import { usePublishers } from '../_hooks/usePublishers';

export const NameForm = () => {
  const publisher: any = usePublishers.use.publisher();
  const updatePublisherProperty: any =
    usePublishers.use.updatePublisherProperty();

  const onInput = (e: any) =>
    updatePublisherProperty(e.target.name, e.target.value);

  const inputProps = {
    onIonInput: onInput,
    clearInput: true,
    className: 'ion-text-end',
  };

  return (
    <IonList inset>
      <IonItem>
        <IonInput
          label="Display Name"
          value={publisher.displayName}
          name="displayName"
          {...inputProps}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="First Name"
          value={publisher.firstName}
          name="firstName"
          {...inputProps}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="Middle Name"
          value={publisher.middleName}
          name="middleName"
          {...inputProps}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="Last Name"
          value={publisher.lastName}
          name="lastName"
          {...inputProps}
        ></IonInput>
      </IonItem>
    </IonList>
  );
};
