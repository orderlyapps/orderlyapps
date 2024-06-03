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

export const CongregationYieldModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [congregation_id, setCongregation_ID] = useState('');
  const congregations = useCongregations.use.congregations();
  const yieldCongregation = useCongregations.use.yieldCongregation();
  const session = useSBAuth.use.session();

  const handleClaim = () => {
    yieldCongregation(congregation_id);
    setIsOpen(false);
  };

  const handleSelect = (id: any) => {
    setCongregation_ID(id);
  };

  return (
    <>
      <IonButton
        onClick={() => setIsOpen(true)}
        expand="full"
        disabled={!session}
      >
        Yield Congregation
      </IonButton>

      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
            <IonTitle>Yield Congregation</IonTitle>
            {congregation_id && (
              <IonButtons slot="end">
                <IonButton onClick={handleClaim}>
                  <strong>Yield</strong>
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {congregations
              .filter((c: any) =>
                c.admins?.some(
                  (a: { publisher_id: string }) =>
                    a.publisher_id === session?.user.id
                )
              )
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

export default CongregationYieldModal;
