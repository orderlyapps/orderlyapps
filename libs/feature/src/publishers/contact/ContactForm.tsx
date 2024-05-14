import { IonInput, IonItem, IonList } from '@ionic/react';
import { usePublishers } from '../_hooks/usePublishers';

export const ContactForm = () => {
  const updatePublisherProperty = usePublishers.use.updatePublisherProperty();
  const publisher: any = usePublishers.use.publisher();

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
          label="Phone"
          value={publisher.phoneNumber}
          name="phoneNumber"
          {...inputProps}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="Email"
          value={publisher.personalEmail}
          name="personalEmail"
          {...inputProps}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="JwPub"
          value={publisher.jwPubEmail}
          name="jwPubEmail"
          {...inputProps}
        ></IonInput>
      </IonItem>
    </IonList>
  );
};
