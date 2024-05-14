import { IonItem, IonList } from '@ionic/react';
import { formatDate } from '@util';
import { eachWeekOfInterval, addWeeks, previousMonday, format } from 'date-fns';

export const WeekList = () => {
  return (
    <>
      <IonList inset>
        {eachWeekOfInterval(
          {
            start: previousMonday(new Date()),
            end: addWeeks(new Date(), 26),
          },
          { weekStartsOn: 1 }
        ).map((week: any) => {
          return (
            <IonItem
              key={week}
              button={true}
              routerLink={
                `/home/schedule/details/` + format(week, 'yyyy-MM-dd')
              }
            >
              {formatDate(week)}
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
};

export default WeekList;
