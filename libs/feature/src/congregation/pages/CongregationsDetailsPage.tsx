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
import { useCongregation } from '../hooks/useCongregation';
import { CongregationDetails } from '../components/CongregationDetails';

export const CongregationsDetailsPage = ({ match }: any) => {
  const congregation = useCongregation.use.congregation();
  const setCongregation = useCongregation.use.setCongregation();

  useEffect(() => {
    const getGongregationDetails = async () => {
      const { data, error } = await supabase
        .from('congregations')
        .select()
        .eq('congregation_id', match.params.id)
        .single();
      setCongregation(data);
    };
    getGongregationDetails();
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
