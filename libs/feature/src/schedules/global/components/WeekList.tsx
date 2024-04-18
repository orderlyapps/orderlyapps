import { useRxAllDocuments } from '@data';
import { IonItem, IonList } from '@ionic/react';
import { getMondays } from '../helper/getMondays';
import { formatDate } from '@util';

export const WeekList = () => {
  return (
    <IonList inset>
      {getMondays().map((week: any) => {
        return (
          <IonItem
            key={week}
            button={true}
            routerLink={'/home/schedule/details/' + week.toString()}
          >
            {formatDate(week).theocraticWeek}
          </IonItem>
        );
      })}
    </IonList>
  );
};
