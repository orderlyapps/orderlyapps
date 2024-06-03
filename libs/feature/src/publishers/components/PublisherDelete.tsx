import { IonActionSheet, IonButton } from '@ionic/react';
import { deletePublisher } from '../_helper/deletePublisher';
import { useRXdb } from '@data';
import { usePublishers } from '../_hooks/usePublishers';

export const PublisherDelete = () => {
  const rxdb = useRXdb.use.rxdb();
  const { publisher_id } = usePublishers.use.publisher();

  return (
    <>
      <IonButton
        id="open-action-sheet"
        expand="block"
        className="ion-padding"
        color={'danger'}
      >
        Delete Publisher
      </IonButton>
      <IonActionSheet
        trigger="open-action-sheet"
        header={'Delete Publisher'}
        buttons={[
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => deletePublisher(rxdb, publisher_id),
            data: {
              action: 'delete',
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
            data: {
              action: 'cancel',
            },
          },
        ]}
      ></IonActionSheet>
    </>
  );
};
