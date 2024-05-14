import { IonButton, IonItem, IonLabel, IonList } from '@ionic/react';
import { useCongregation } from '../hooks/useCongregation';
import { useSettings } from '@data';

export const CongregationDetails = () => {
  const congregation = useCongregation.use.congregation();
  const setSettingsProperty = useSettings.use.setSettingsProperty();

  const handleMakeMyCongregation = () => {
    setSettingsProperty('congregation_id', congregation?.congregation_id);
  };

  return (
    <IonList inset>
      <IonItem>
        <IonLabel>Name</IonLabel>
        {congregation?.name}
      </IonItem>
      <IonButton
        className="ion-padding"
        expand="block"
        onClick={handleMakeMyCongregation}
      >
        Make My Congregation
      </IonButton>
    </IonList>
  );
};
