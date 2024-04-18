import { useRxDocumentByID } from '@data';
import { usePublisher } from '@feature';
import { IonItem, IonLabel, IonList } from '@ionic/react';

export const PublisherDetails = () => {
  const { id } = usePublisher.use.publisher();
  const { doc: publisher } = useRxDocumentByID('publishers', id);

  if (!publisher) {
    return null;
  }

  return (
    <IonList inset>
      <IonItem>
        <IonLabel>Name</IonLabel>
        {publisher.firstName}
      </IonItem>
      <IonItem>
        <IonLabel>Phone</IonLabel>
        {publisher.phoneNumber}
      </IonItem>
      <IonItem>
        <IonLabel>Email</IonLabel>
        {publisher.personalEmail}
      </IonItem>
      <IonItem>
        <IonLabel>JWPub</IonLabel>
        {publisher.jwPubEmail}
      </IonItem>
    </IonList>
  );
};

export default PublisherDetails;
