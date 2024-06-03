import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Spinner } from '@ui';
import { Suspense, lazy } from 'react';
import { add } from 'ionicons/icons';
import { useSettings } from '@data';
import { useCongregations } from '../../congregation/hooks/useCongregations';
import { useSBAuth } from '../../user/useSBAuth';
import { isCongregationAdmin } from '../../congregation/hooks/isCongregationAdmin';
const PublishersList = lazy(() => import('../components/PublishersList'));

export const PublisherListPage = () => {
  const { congregation_id } = useSettings.use.settings();
  const congregations = useCongregations.use.congregations();
  const session = useSBAuth.use.session();

  const isAdmin = () => {
    const congregation = congregations?.find((c) => c.id === congregation_id);
    return isCongregationAdmin(congregation, session);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={'Home'}></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            {isAdmin() && (
              <IonButton routerLink={'/home/publisher/details/new'}>
                <IonIcon icon={add}></IonIcon>
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>Publishers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <PublishersList></PublishersList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default PublisherListPage;
