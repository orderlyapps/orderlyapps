import { supabase } from '@data';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { lazy, useState } from 'react';
import { useCongregation } from './hooks/useCongregation';

const CongregationForm = lazy(() => import('./components/CongregationForm'));

export const CreateCongregationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const congregation = useCongregation.use.congregation();

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('congregations')
      .upsert([congregation])
      .select();
  };

  return (
    <>
      <IonButton expand="full" onClick={() => setIsOpen(true)}>
        Create Congregation
      </IonButton>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>CreateCongregationModal</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <CongregationForm></CongregationForm>
          <IonButton expand="full" onClick={handleSubmit}>
            Create
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default CreateCongregationModal;
