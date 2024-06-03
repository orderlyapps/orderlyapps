import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Spinner } from '@ui';
import { Suspense, lazy, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { formatDisplayName } from '../name/formatDisplayName';
import { useRXdb } from '@data';
import { OutlinesDetails } from '../outlines/OutlinesDetails';
import { ContactDetails } from '../contact/ContactDetails';
// import { PublisherDelete } from './PublisherDelete';
import { usePublishers } from '../_hooks/usePublishers';
import { PublisherDelete } from '../components/PublisherDelete';
import {PublisherDetails} from '../../_/PublisherDetails';
const NameDetails = lazy(() => import('../name/NameDetails'));

interface UserDetailPageProps
  extends RouteComponentProps<{
    publisher_id: string;
  }> {}

export const PublisherDetailsPage = ({ match }: UserDetailPageProps) => {
  const publisher = usePublishers.use.publisher();
  const resetPublisher = usePublishers.use.resetPublisher();
  const setPublisher = usePublishers.use.setPublisher();

  useEffect(() => {
    if (match.params.publisher_id === 'new') {
      resetPublisher();
      return;
    }
    setPublisher(match.params.publisher_id);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={'Publishers'}></IonBackButton>
          </IonButtons>
          <IonTitle>{formatDisplayName(publisher as any)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <PublisherDetails></PublisherDetails>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default PublisherDetailsPage;
