import {
  IonInput,
  IonItem,
  IonList
} from '@ionic/react';
import { useCongregations } from '../hooks/useCongregations';

export const CongregationForm = () => {
  const congregation = useCongregations.use.congregation();
  const updateCongregationProperties = useCongregations.use.updateCongregationProperties();

  return (
    <IonList inset>
      <IonItem>
        <IonInput
          label="Name"
          value={congregation.name}
          name="name"
          // onIonChange={(e) => updateCongregationProperties('name', e.target.value)}
        ></IonInput>
      </IonItem>
    </IonList>
  );
};

export default CongregationForm;
