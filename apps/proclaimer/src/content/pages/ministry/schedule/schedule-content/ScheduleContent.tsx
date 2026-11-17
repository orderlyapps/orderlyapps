import React, { Fragment } from "react";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import {
  MINISTRY_SCHEDULE_DAYS,
  ministryScheduleCollection,
  type MinistrySchedule,
} from "@amodeo/proclaimer/feature/ministry";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { formatTime } from "@amodeo/proclaimer/util/date/formatTime";

export const ScheduleContent: React.FC = () => {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: schedule_rows } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ ms: ministryScheduleCollection })
            .where(({ ms }) => eq(ms.congregation_id, congregation_id))
            .orderBy(({ ms }) => ms.day_of_week)
        : undefined,
    [congregation_id],
  );

  const rows_by_day = new Map<number, MinistrySchedule[]>();
  for (const row of schedule_rows ?? []) {
    const group = rows_by_day.get(row.day_of_week) ?? [];
    group.push(row);
    rows_by_day.set(row.day_of_week, group);
  }
  for (const group of rows_by_day.values()) {
    group.sort((a, b) => a.sort_order - b.sort_order);
  }

  return (
    <IonList className="ion-no-padding">
      {schedule_rows !== undefined && rows_by_day.size === 0 && (
        <IonItem lines="none">
          <IonLabel>
            <IonText color="medium">No ministry schedule</IonText>
          </IonLabel>
        </IonItem>
      )}
      {MINISTRY_SCHEDULE_DAYS.map(({ day_of_week, label }) => {
        const groups = rows_by_day.get(day_of_week) ?? [];
        if (groups.length === 0) {
          return null;
        }

        return (
          <IonItem key={day_of_week}>
            <IonLabel>
              <strong>{label}</strong>
              <br />
              <IonGrid>
                {groups.map(({ id, start_time, location, conductor, details }) => {
                  return (
                    <Fragment key={id}>
                      <IonRow>
                        <IonCol size="2" className="ion-no-padding">
                          <>{formatTime(start_time.slice(0, 5))}</>
                        </IonCol>
                        <IonCol size="auto" className="ion-no-padding">
                          <>{location}</>
                        </IonCol>
                      </IonRow>
                      <Space size="xs" />
                      <IonRow className="ion-padding-bottom">
                        <IonCol size="2" className="ion-no-padding"></IonCol>
                        <IonCol size="auto" className="ion-no-padding">
                          <>{conductor}</>
                        </IonCol>
                      </IonRow>
                      {details && (
                        <IonRow className="ion-padding-bottom">
                          <IonCol size="2" className="ion-no-padding"></IonCol>
                          <IonCol size="auto" className="ion-no-padding">
                            <IonText color="medium">{details}</IonText>
                          </IonCol>
                        </IonRow>
                      )}
                    </Fragment>
                  );
                })}
              </IonGrid>
            </IonLabel>
          </IonItem>
        );
      })}

      <Space />
    </IonList>
  );
};
