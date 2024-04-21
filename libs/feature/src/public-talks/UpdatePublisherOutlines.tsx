import { IonIcon, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { PUBLIC_TALK_THEMES } from '../schedules/public-talks/helper/publicTalkData';
import { checkmarkCircle } from 'ionicons/icons';
import { usePublisher } from '../publishers/hooks/usePublisher';
import { sortOutlines } from './sortOutlines';

export const UpdatePublisherOutlines = () => {
  const { outlines }: any = usePublisher.use.publisher();
  const setPublisherProperty = usePublisher.use.setPublisherProperty();

  const handleRemoveOutline = (outline: string) => {
    setPublisherProperty(
      'outlines',
      outlines?.filter((o: string) => o !== outline) as string[]
    );
  };

  const handleAddOutline = (outline: string) => {
    setPublisherProperty(
      'outlines',
      [outline, ...(outlines || [])].sort(sortOutlines) as string[]
    );
  };

  return (
    <IonList>
      {PUBLIC_TALK_THEMES.map((outline, index) => {
        if (outlines?.includes(outline.number as never))
          return (
            <IonItem
              onClick={() => handleRemoveOutline(outline.number)}
              key={index}
            >
              <IonText className="ion-text-wrap ion-padding">
                <strong>Outline: {outline.number}</strong>
                <br />
                {outline.title}
              </IonText>

              <IonIcon icon={checkmarkCircle} color="primary" slot="end" />
            </IonItem>
          );
        return (
          <IonItem onClick={() => handleAddOutline(outline.number)} key={index}>
            <IonText className="ion-text-wrap ion-padding">
              <strong>Outline: {outline.number}.</strong>
              <br />
              {outline.title}
            </IonText>

            <IonText color="primary" slot="end">
              <strong color="primary"></strong>
            </IonText>
          </IonItem>
        );
      })}
    </IonList>
  );
};
