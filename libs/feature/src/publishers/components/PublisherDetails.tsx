import { useRxDocumentByID } from '@data';
import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import { PUBLIC_TALK_THEMES } from '../../public-talks/helper/publicTalkData';
import { PublisherOutlinesList } from '../../public-talks/components/PublisherOutlinesList';
import { usePublisher } from '../hooks/usePublisher';

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
          {`{publisher.displayName}`}
        </IonItem>
        <IonItem>
          <IonLabel>First Name</IonLabel>
          {`{publisher.firstName}`}
        </IonItem>
        <IonItem>
          <IonLabel>Middle Name</IonLabel>
          {`{publisher.middleName}`}
        </IonItem>
        <IonItem>
          <IonLabel>Last Name</IonLabel>
          {`{publisher.lastName}`}
        </IonItem>
      </IonList>

      <PublisherOutlinesList></PublisherOutlinesList>
    </>
  );
};

export default PublisherDetails;
