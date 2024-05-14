import { useStore } from '@data';
import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import NameEditModal from './NameEditModal';
import { usePublishers } from '../_hooks/usePublishers';

export const NameDetails = () => {
  const publisher: any = usePublishers.use.publisher();

  return (
    <>
      <IonList inset>
        <IonListHeader>
          <IonLabel>Name</IonLabel>
          <NameEditModal></NameEditModal>
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

export default NameDetails;
