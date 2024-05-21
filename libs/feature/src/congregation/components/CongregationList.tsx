import { useSettings } from '@data';
import { IonItem, IonList } from '@ionic/react';
import { useEffect } from 'react';
import { useCongregations } from '../hooks/useCongregations';

export const CongregationList = () => {
  const { congregation_id } = useSettings.use.settings();
  const congregations = useCongregations.use.congregations();
  const fetchCongregations = useCongregations.use.fetchCongregations();

  useEffect(() => {
    fetchCongregations();
  }, []);

  return (
    <IonList>
      {congregations?.map((congregation) => {
        return (
          <IonItem
            key={congregation.id}
            routerLink={'/home/congregations/details/' + congregation.id}
            color={congregation_id === congregation.id ? 'primary' : 'light'}
          >
            {congregation.name}
          </IonItem>
        );
      })}
    </IonList>
  );
};
