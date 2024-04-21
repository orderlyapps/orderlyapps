import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from '@ionic/react';
import { usePublisher } from '../publishers/hooks/usePublisher';
import { PUBLIC_TALK_THEMES } from '../schedules/public-talks/helper/publicTalkData';
import UpdatePublisherOutlinesModal from './UpdatePublisherOutlinesModal';
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { sortOutlines } from './sortOutlines';
import { useSBPublisher } from '@feature';

export const PublisherOutlines = () => {
  const { id } = usePublisher.use.publisher();
  const [isOpen, setIsOpen] = useState(false);

  const publisher = useSBPublisher(id, isOpen);

  if (!publisher) return;
  return (
    <>
      <IonList inset>
        <IonListHeader>
          <IonLabel>Outlines</IonLabel>
          <IonButton onClick={() => setIsOpen(true)}>
            <strong>Edit</strong>
          </IonButton>
        </IonListHeader>
        {publisher.outlines?.sort(sortOutlines).map((outline: string) => {
          return (
            <IonItem key={outline}>
              <IonLabel>
                <strong> {outline}</strong>
              </IonLabel>

              <IonText className="ion-text-end ion-padding">
                {
                  PUBLIC_TALK_THEMES?.find((talk) => talk.number === outline)
                    ?.title
                }
              </IonText>
            </IonItem>
          );
        })}
      </IonList>
      <UpdatePublisherOutlinesModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></UpdatePublisherOutlinesModal>
    </>
  );
};
