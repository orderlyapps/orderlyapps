import { IonInput, IonItem, IonList } from '@ionic/react';
import { useStore } from '@data';

export const PublisherNameForm = () => {
  const { publisher } = useStore.use.store();
  const setStoreProperty = useStore.use.setStoreProperty();

  const onInput = (e: any) =>
    setStoreProperty('publisher', {
      ...publisher,
      [e.target.name]: e.target.value,
    });

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
