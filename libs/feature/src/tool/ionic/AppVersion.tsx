import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from '@ionic/react';
import { timeToNow } from '@util';

import now from '~build/time';

export const AppVersion = () => {
  const buildTime = now.getTime();

  const formattedBuildTime = new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(buildTime);

  const timeDifference = timeToNow(buildTime);
  return (
    <IonList inset lines="none">
      <IonListHeader>
        <IonLabel>App Version</IonLabel>
      </IonListHeader>
      <IonItem detail={false}>
        <IonLabel>{formattedBuildTime}</IonLabel>
        <IonText>updated {timeDifference}</IonText>
      </IonItem>
    </IonList>
  );
};

export default AppVersion;
