import { useRxDocumentByID } from '@data';
import { usePublisher, useSBPublisher } from '@feature';
import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import { PUBLIC_TALK_THEMES } from '../../schedules/public-talks/helper/publicTalkData';
import { PublisherOutlines } from '../../public-talks/PublisherOutlines';

export const PublisherDetails = () => {
  const publisher = usePublisher.use.publisher();

  return (
    <>
      <IonList inset>
        <IonListHeader>
          <IonLabel>Name</IonLabel>
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

      <PublisherOutlines></PublisherOutlines>
    </>
  );
};

export default PublisherDetails;
