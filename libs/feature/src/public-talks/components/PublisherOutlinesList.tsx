import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from '@ionic/react';
import { usePublisher } from '../../publishers/hooks/usePublisher';
import { PUBLIC_TALK_THEMES } from '../helper/publicTalkData';
import UpdatePublisherOutlinesModal from '../modals/UpdatePublisherOutlinesModal';
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { sortOutlines } from '../helper/sortOutlines';
import { OutlineItem } from './OutlineItem';
import { getOutline } from '../helper/getOutline';
import useSBPublisher from '../../publishers/hooks/useSBPublisher';

export const PublisherOutlinesList = () => {
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
              <OutlineItem
                number={outline}
                title={getOutline(outline) as string}
              ></OutlineItem>
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
