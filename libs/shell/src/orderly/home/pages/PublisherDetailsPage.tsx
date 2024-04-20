import {
  PublisherDetails,
  UpdatePublisherOutlines,
  usePublisher,
  useSBPublisher,
} from '@feature';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Spinner } from '@ui';
import { Suspense, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import EditPublisherModal from '../modals/EditPublisherModal';
import { formatDisplayName } from '@feature';

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

export const PublisherDetailsPage = ({ match }: UserDetailPageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const publisher = useSBPublisher(match.params.id);
  const setPublisher = usePublisher.use.setPublisher();

  useEffect(() => {
    setPublisher(publisher);
  }, [publisher]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={'Publishers'}></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(true)}>Edit</IonButton>
          </IonButtons>
          <IonTitle>{formatDisplayName(publisher)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <PublisherDetails></PublisherDetails>

          <EditPublisherModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          ></EditPublisherModal>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default PublisherDetailsPage;
