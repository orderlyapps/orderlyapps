import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonItem,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useState } from 'react';
import { useCongregations } from '../hooks/useCongregations';
import { useSettings } from '@data';
import { SelectIcon } from '../../ui/ionic/SelectIcon';

export const CongregationSelectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const congregations = useCongregations.use.congregations();
  const { congregation_id } = useSettings.use.settings();
  const setSettingsProperties = useSettings.use.setSettingsProperties();

  const handleSelect = (id: any) => {
    setSettingsProperties({ congregation_id: id });
    setIsOpen(false);
  };

  return (
    <>
      <IonButton onClick={() => setIsOpen(true)} expand="full">
        Select Congregation
      </IonButton>

      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Select Congregation</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {congregations.map((congregation) => (
              <IonItem
                key={congregation.id}
                onClick={() => handleSelect(congregation.id)}
              >
                {congregation.name}
                {congregation_id === congregation.id && (
                  <SelectIcon></SelectIcon>
                )}
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default CongregationSelectModal;
