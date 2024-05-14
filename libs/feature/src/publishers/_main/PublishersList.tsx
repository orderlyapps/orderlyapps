import { IonItem, IonLabel, IonList } from '@ionic/react';
import { formatDisplayName } from '../name/formatDisplayName';
import { useEffect } from 'react';
import { useRXdb, useSettings } from '@data';
import { usePublishers } from '../_hooks/usePublishers';

export const PublishersList = () => {
  const { congregation_id } = useSettings.use.settings();
  if (!congregation_id) {
    return <div className="full centered">Please select a congregation</div>;
  }

  const publishers = usePublishers.use.publishers();
  const fetchPublishers = usePublishers.use.fetchPublishers();
  const rxdb = useRXdb.use.rxdb();

  useEffect(() => {
    fetchPublishers(rxdb, congregation_id);
  }, []);

  if (!publishers) return null;

  return (
    <IonList inset>
      {publishers
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
