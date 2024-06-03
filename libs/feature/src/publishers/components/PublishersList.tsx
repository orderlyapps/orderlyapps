import { IonItem, IonLabel, IonList } from '@ionic/react';
import { formatDisplayName } from '../name/formatDisplayName';
import { useEffect } from 'react';
import { useRXdb, useSettings } from '@data';
import { usePublishers } from '../_hooks/usePublishers';

export const PublishersList = () => {
  const { congregation_id } = useSettings.use.settings();
  if (!congregation_id) {
    return <div className="full centered">No congregation selected</div>;
  }

  const publishers = usePublishers.use.publishers();
  const fetchPublishers = usePublishers.use.setPublishers();
  const rxdb = useRXdb.use.rxdb();

  useEffect(() => {
    fetchPublishers(rxdb, congregation_id);
  }, []);

  if (!publishers)
    return <div className="full centered">No publishers</div>;

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
        .map((p: any) => (
          <IonItem
            key={p.id}
            button={true}
            routerLink={'/home/publisher/details/' + p.id}
          >
            <IonLabel>{formatDisplayName(p)}</IonLabel>
          </IonItem>
        ))}
    </IonList>
  );
};

export default PublishersList;
