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
import { Suspense, useEffect } from 'react';
import { useCongregations } from '../hooks/useCongregations';
import { isCongregationAdmin } from '../hooks/isCongregationAdmin';
import { useSBAuth } from '../../user/useSBAuth';
import CongregationEditModal from '../modals/CongregationEditModal';
import CongregationDetails from '../components/CongregationDetails';

export const CongregationsDetailsPage = ({ match }: any) => {
  const congregation: any = useCongregations.use.congregation();
  const setCongregation = useCongregations.use.setCongregation();
  const session = useSBAuth.use.session() as any;

  useEffect(() => {
    setCongregation(match.params.id);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{congregation.name}</IonTitle>
          <IonButtons slot="end">
            {isCongregationAdmin(congregation, session) && (
              <CongregationEditModal></CongregationEditModal>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <CongregationDetails readonly></CongregationDetails>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default CongregationsDetailsPage;
