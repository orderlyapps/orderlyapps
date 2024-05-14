import { IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { formatDate } from '@util';
import { addWeeks, eachWeekOfInterval, format, previousMonday } from 'date-fns';

export const WeekPicker = ({ name, onSelect }: any) => {
  return (
    <IonItem>
      <IonSelect interface={'alert'} onIonChange={onSelect} name={name}>
        {eachWeekOfInterval(
          {
            start: previousMonday(new Date()),
            end: addWeeks(new Date(), 26),
          },
          { weekStartsOn: 1 }
        ).map((monday, index) => {

          return (
            <IonSelectOption value={format(monday, 'yyyy-MM-dd')} key={index}>
              {formatDate(monday)}
            </IonSelectOption>
          );
        })}
      </IonSelect>
    </IonItem>
  );
};
