import { IonInput, IonItem, IonList } from '@ionic/react';
import { usePublishers } from '../publishers/_hooks/usePublishers';

export const PublisherDetails = ({
  readonly = false,
}: {
  readonly?: boolean;
}) => {
  const publisher = usePublishers.use.publisher();
  console.log('publisher:', publisher);
  const props = {
    // onIonChange: (e: any) =>
    //   updateCongregationProperties({ [e.target.name]: e.target.value }),
    clearInput: true,
    readonly,
    className: 'ion-text-end',
  };

  return (
    <IonList inset>
      <IonItem>
        <IonInput
          label="Name"
          // value={publisher.name}
          name="name"
          {...props}
        ></IonInput>
      </IonItem>
    </IonList>
  );
};

export default PublisherDetails;
