import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { useCongregations } from '../hooks/useCongregations';
import { supabase, useSettings } from '@data';
import { SelectIcon } from '../../ui/ionic/SelectIcon';
import { useSBAuth } from '../../user/useSBAuth';

export const CongregationClaimModal = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [congregation_id, setCongregation_ID] = useState('');
  const congregations = useCongregations.use.congregations();
  const claimCongregation = useCongregations.use.claimCongregation();
  const session = useSBAuth.use.session();

  const handleClaim = () => {
    claimCongregation(congregation_id);
    setIsOpen(false);
  };

  const handleSelect = (id: any) => {
    setCongregation_ID(id);
  };

  return (
    <>
      <IonButton onClick={() => setIsOpen(true)} expand="full"
      disabled={!session }
      >
        Claim Congregation
      </IonButton>

      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
            <IonTitle>Claim Congregation</IonTitle>
            {congregation_id && (
              <IonButtons slot="end">
                <IonButton onClick={handleClaim}>
                  <strong>Claim</strong>
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {congregations
              .filter((c) => !c.admins)
              .map((c) => (
                <IonItem key={c.id} onClick={() => handleSelect(c.id)}>
                  {c.name}
                  {congregation_id === c.id && <SelectIcon></SelectIcon>}
                </IonItem>
              ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default CongregationClaimModal;
