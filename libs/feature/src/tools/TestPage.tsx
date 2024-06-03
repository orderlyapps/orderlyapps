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
import { Suspense } from 'react';
import { supabase } from '@data';

export const TestPage = () => {
  const handleClick = async () => {
    const description_input = 'description_input';
    const name_input = 'name_input';
    const weeks_input = [new Date('2024-05-28').toISOString()];
    const congregation_id_input = 'b849216a-a104-4be6-923f-97bd3462888f';

    let { data, error } = await supabase.from('events').select(`
  *,
  schedule (
    congregation_id, week_id
  )
`);


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
          <div className="full centered">
            <IonButton expand="full" onClick={handleClick}>Test Function</IonButton>
          </div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default TestPage;
