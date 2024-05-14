import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import ContactEditModal from './ContactEditModal';
import { usePublishers } from '../_hooks/usePublishers';

export const ContactDetails = () => {
  const publisher = usePublishers.use.publisher();

  return (
    <>
      <IonList inset>
        <IonListHeader>
          <IonLabel>Contact</IonLabel>
          <ContactEditModal></ContactEditModal>
        </IonListHeader>
        <IonItem>
          <IonLabel>Phone</IonLabel>
          {publisher.phoneNumber}
        </IonItem>
        <IonItem>
          <IonLabel>Email</IonLabel>
          {publisher.personalEmail}
        </IonItem>
        <IonItem>
          <IonLabel>JwPub</IonLabel>
          {publisher.jwPubEmail}
        </IonItem>
      </IonList>
    </>
  );
};
