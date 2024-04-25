import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';
import { sortOutlines } from '../../helper/sortOutlines';
import { OutlineItem } from '../OutlineItem';
import { getOutline } from '../../helper/getOutline';
import { useStore } from '@data';
import UpdatePublisherOutlinesModal from '../../modals/UpdatePublisherOutlinesModal';

export const PublisherOutlinesList = () => {
  let {
    publisher: { outlines },
  } = useStore.use.store();

  if (!outlines) outlines = [];

  return (
    <>
      <IonList inset>
        <IonListHeader>
          <IonLabel>Outlines</IonLabel>
          <UpdatePublisherOutlinesModal></UpdatePublisherOutlinesModal>
        </IonListHeader>
        {outlines?.sort(sortOutlines).map((outline: string) => {
          return (
            <IonItem key={outline}>
              <OutlineItem
                outline={{
                  number: outline,
                  title: getOutline(outline) as string,
                }}
              ></OutlineItem>
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
};
