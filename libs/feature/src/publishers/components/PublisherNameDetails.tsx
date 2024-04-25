import { useStore } from '@data';
import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import EditPublisherNameModal from '../EditPublisherNameÏModal';

export const PublisherNameDetails = () => {
  const { publisher } = useStore.use.store();

  return (
    <>
      <IonList inset>
        <IonListHeader>
          <IonLabel>Name</IonLabel>
          <EditPublisherNameModal></EditPublisherNameModal>
        </IonListHeader>
        <IonItem>
          <IonLabel>Display Name</IonLabel>
          {publisher.displayName}
        </IonItem>
        <IonItem>
          <IonLabel>First Name</IonLabel>
          {publisher.firstName}
        </IonItem>
        <IonItem>
          <IonLabel>Middle Name</IonLabel>
          {publisher.middleName}
        </IonItem>
        <IonItem>
          <IonLabel>Last Name</IonLabel>
          {publisher.lastName}
        </IonItem>
      </IonList>
    </>
  );
};

export default PublisherNameDetails;
