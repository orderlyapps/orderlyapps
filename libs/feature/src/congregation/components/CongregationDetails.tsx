import { IonButton, IonItem, IonLabel, IonList } from '@ionic/react';
import { useCongregations } from '../hooks/useCongregations';
import { useSettings } from '@data';
import { formatAddress } from '../../formatting/formatAddress';

export const CongregationDetails = () => {
  const congregation = useCongregations.use.congregation();
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
      <IonItem>
        <IonLabel>Number</IonLabel>
        {congregation?.number}
      </IonItem>
      <IonItem>
        <IonLabel>Unit Number</IonLabel>
        {congregation.unit_number}
      </IonItem>
      <IonItem>
        <IonLabel>Lot Number</IonLabel>
        {congregation.house_number}
      </IonItem>
      <IonItem>
        <IonLabel>Street</IonLabel>
        {congregation.street}
      </IonItem>
      <IonItem>
        <IonLabel>Suburb</IonLabel>
        {congregation.suburb}
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
