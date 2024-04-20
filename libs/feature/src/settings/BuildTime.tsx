import { IonItem, IonLabel, IonList, IonNote, IonText } from '@ionic/react';
import { buildTime } from '@util';

export const BuildTime = () => {
  return (
    <IonList inset>
      <IonItem>
        <IonLabel>Build Time:</IonLabel>

        <div className="ion-text-end ion-padding-vertical">
          <IonText>{buildTime.formattedBuildTime}</IonText>
          <br />
          <IonNote>{buildTime.timeDifference}</IonNote>
        </div>
      </IonItem>
    </IonList>
  );
};
