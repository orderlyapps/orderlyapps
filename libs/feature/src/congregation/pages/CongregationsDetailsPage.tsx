import { supabase } from '@data';
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
import { CongregationDetails } from '../components/CongregationDetails';

export const CongregationsDetailsPage = ({ match }: any) => {
  const congregation = useCongregations.use.congregation();
  const setCongregation = useCongregations.use.setCongregation();

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
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <CongregationDetails></CongregationDetails>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default CongregationsDetailsPage;
