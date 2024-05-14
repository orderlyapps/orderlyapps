import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Spinner } from '@ui';
import { Suspense, useState } from 'react';
import { usePublishers } from '../_hooks/usePublishers';

export const PublishersImportPage = () => {
  const [publishers, setPublishers] = useState([]);
  // const setPublisher = usePublishers.use.setPublisher();
  const [isOpen, setIsOpen] = useState(false);

  // const handleSelect = (p: any) => {
  //   setPublisher({
  //     ...p,
  //     phoneNumber: p.phoneNumber.replace(/\s+/g, ''),
  //     publicTalkOutlines:
  //       typeof p.publicTalkOutlines === 'number'
  //         ? [p.publicTalkOutlines]
  //         : p.publicTalkOutlines
  //         ? p.publicTalkOutlines.split(',').map((o: string) => o.trim())
  //         : [],
  //   });
  //   setIsOpen(true);
  // };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Import</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <IonList>
            {/* <IonCSVInput setData={setPublishers}></IonCSVInput> */}
          </IonList>
          <IonList>
            {/* {publishers.map((publisher: any) => {
              return (
                <IonItem
                  key={publisher.firstName + publisher.lastName}
                  onClick={() => handleSelect(publisher)}
                >
                  {formatDisplayName(publisher)}
                </IonItem>
              );
            })} */}
          </IonList>

          {/* <AddPublisherModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          ></AddPublisherModal> */}
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default PublishersImportPage;
