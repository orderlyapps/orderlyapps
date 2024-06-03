import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { lazy, useEffect, useState } from 'react';
import { useCongregations } from '../hooks/useCongregations';
import { useSBAuth } from '../../user/useSBAuth';

const CongregationForm = lazy(() => import('../components/CongregationDetails'));

export const CongregationCreateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const upsertCongregation = useCongregations.use.upsertCongregation();
  const resetCongregation = useCongregations.use.resetCongregation();
  const session = useSBAuth.use.session();

  const handleCreate = async () => {
    upsertCongregation();
    resetCongregation();
    setIsOpen(false);
  };

  useEffect(() => {
    resetCongregation();
  }, []);

  return (
    <>
      <IonButton
        expand="full"
        onClick={() => setIsOpen(true)}
        disabled={!session}
      >
        Create Congregation
      </IonButton>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
            <IonTitle>Create Congregation</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleCreate}>
                <strong>Create</strong>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <CongregationForm></CongregationForm>
        </IonContent>
      </IonModal>
    </>
  );
};

export default CongregationCreateModal;
