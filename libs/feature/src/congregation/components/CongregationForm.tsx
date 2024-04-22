import {
  IonInput,
  IonItem,
  IonList
} from '@ionic/react';
import { useCongregation } from '../hooks/useCongregation';

export const CongregationForm = () => {
  const congregation = useCongregation.use.congregation();
  const setCongregationProperty = useCongregation.use.setCongregationProperty();

  return (
    <IonList inset>
      <IonItem>
        <IonInput
          label="Name"
          value={congregation.name}
          name="name"
          onIonChange={(e) => setCongregationProperty('name', e.target.value)}
        ></IonInput>
      </IonItem>
    </IonList>
  );
};
