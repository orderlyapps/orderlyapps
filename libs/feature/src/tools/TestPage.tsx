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
import { Suspense, lazy } from 'react';
import { CongregationList } from '../congregation/components/CongregationList';
import { CongregationDetails } from '../congregation/components/CongregationDetails';
import { supabase } from '@data';

export const TestPage = () => {
  const handleClick = async () => {
    const description_input = 'description_input';
    const name_input = 'name_input';
    const weeks_input = [new Date('2024-05-28').toISOString()];
    const congregation_id_input = 'b849216a-a104-4be6-923f-97bd3462888f';

//     let { data, error } = await supabase.from('schedule').select(`
//   week_id,
//   events (
//     name
//   )
// `);

    let { data, error } = await supabase.from('events').select(`
  *,
  schedule (
    congregation_id, week_id
  )
`);

    // let { data, error } = await supabase.rpc('create_event7', {
    //   description_input,
    //   name_input,
    //   weeks_input,
    //   congregation_id_input
    // });

    if (error) console.error(error);
    else console.log(data);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Create Congregation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <IonButton onClick={handleClick}>Test Function</IonButton>
          {/* <CongregationList></CongregationList>
          <CongregationDetails></CongregationDetails> */}
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default TestPage;
