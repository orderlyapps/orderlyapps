import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';
import { usePublisher } from '../publishers/hooks/usePublisher';
import { PUBLIC_TALK_THEMES } from '../schedules/public-talks/helper/publicTalkData';
import UpdatePublisherOutlinesModal from './UpdatePublisherOutlinesModal';
import { useState } from 'react';

export const PublisherOutlines = () => {
  const publisher = usePublisher.use.publisher();
  const [setIsOpen, setSetIsOpen] = useState(false);

  return (
    <>
      <IonList inset>
        <IonListHeader>
          <IonLabel>Outlines</IonLabel>
          <IonButton onClick={() => setSetIsOpen(true)}>
            <strong>Edit</strong>
          </IonButton>
        </IonListHeader>
        {publisher.outlines?.map((outline) => {
          return (
            <IonItem>
              <IonLabel>{outline}</IonLabel>
              {
                PUBLIC_TALK_THEMES?.find((talk) => talk.number === outline)
                  ?.title
              }
            </IonItem>
          );
        })}
      </IonList>
      <UpdatePublisherOutlinesModal
        isOpen={setIsOpen}
        setIsOpen={setSetIsOpen}
      ></UpdatePublisherOutlinesModal>
    </>
  );
};
