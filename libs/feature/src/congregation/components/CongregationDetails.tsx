import { IonInput, IonItem, IonList } from '@ionic/react';
import { useCongregations } from '../hooks/useCongregations';

export const CongregationDetails = ({
  readonly = false,
}: {
  readonly?: boolean;
}) => {
  const congregation = useCongregations.use.congregation();
  const updateCongregationProperties =
    useCongregations.use.updateCongregationProperties();

  const props = {
    onIonChange: (e: any) =>
      updateCongregationProperties({ [e.target.name]: e.target.value }),
    clearInput: true,
    readonly,
    className: 'ion-text-end',
  };

  return (
    <IonList inset>
      <IonItem>
        <IonInput
          label="Name"
          value={congregation.name}
          name="name"
          {...props}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          label="State"
          value={congregation.state}
          name="state"
          {...props}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          label="Country"
          value={congregation.country}
          name="country"
          {...props}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          label="Phone"
          value={congregation.phone}
          name="phone"
          {...props}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          label="Email"
          value={congregation.email}
          name="email"
          {...props}
        ></IonInput>
      </IonItem>
    </IonList>
  );
};

export default CongregationDetails;
