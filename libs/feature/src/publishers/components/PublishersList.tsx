import { IonItem, IonLabel, IonList } from '@ionic/react';
import { formatDisplayName } from '../helper/formatDisplayName';
import useSBPublishers from '../hooks/useSBPublishers';
import { useEffect } from 'react';
import { supabase, useStore } from '@data';

export const PublishersList = ({ reQuery }: { reQuery: boolean }) => {
  // const publishers = useSBPublishers(reQuery);

  const { publisher, publisherList } = useStore.use.store();
  const setStoreProperty = useStore.use.setStoreProperty();

  useEffect(() => {
    const getPublisherList = async () => {
      let { data }: any = await supabase
        .from('publishers')
        .select(`publisher_id, displayName, firstName, lastName, outlines`);
      setStoreProperty('publisherList', data);
    };

    getPublisherList();
  }, [publisher]);

  if (!publisherList) return null;

  return (
    <IonList inset>
      {publisherList
        .sort((a: any, b: any) => {
          if (a.lastName !== b.lastName) {
            return a.lastName.localeCompare(b.lastName);
          }
          if (a.displayName !== b.displayName) {
            return a.displayName.localeCompare(b.displayName);
          }
          return a.firstName.localeCompare(b.firstName);
        })
        .map((publisher: any) => (
          <IonItem
            key={publisher.publisher_id}
            button={true}
            routerLink={'/home/publisher/details/' + publisher.publisher_id}
          >
            <IonLabel>{formatDisplayName(publisher)}</IonLabel>
          </IonItem>
        ))}
    </IonList>
  );
};

export default PublishersList;
