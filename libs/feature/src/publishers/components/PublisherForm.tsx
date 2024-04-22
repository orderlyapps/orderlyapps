import { IonInput, IonItem, IonList } from '@ionic/react';
import { usePublisher } from '../hooks/usePublisher';

export const PublisherForm = () => {
  const publisher = usePublisher.use.publisher();
  const setPublisherProperty = usePublisher.use.setPublisherProperty();

  const onInput = (e: any) =>
    setPublisherProperty(e.target.name, e.target.value as string);

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
          value={'publisher.displayName'}
          name="displayName"
          {...inputProps}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="First Name"
          value={'publisher.firstName'}
          name="firstName"
          {...inputProps}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="Middle Name"
          value={'publisher.middleName'}
          name="middleName"
          {...inputProps}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="Last Name"
          value={'publisher.lastName'}
          name="lastName"
          {...inputProps}
        ></IonInput>
      </IonItem>
    </IonList>
  );
};
