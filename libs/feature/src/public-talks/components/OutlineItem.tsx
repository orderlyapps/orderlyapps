import { IonText } from '@ionic/react';

export const OutlineItem = ({
  number,
  title,
}: {
  number: string;
  title: string;
}) => {
  return (
    <IonText className="ion-text-wrap ion-padding">
      <strong>No. {number}.</strong>
      <br />
      {title}
    </IonText>
  );
};
