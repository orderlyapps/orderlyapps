import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonList,
} from "@ionic/react";
import { useRouteMatch } from "react-router-dom";
import { startOfWeek, format } from "date-fns";
import { SettingsIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/settings/SettingsIconButton";
import { WeekNavigation } from "@amodeo/proclaimer/ui/components/navigation/week-navigation/WeekNavigation";
import { WeekendAssignmentList, WeekendSmsSettingsModal } from "@amodeo/proclaimer/feature/weekend";

function WeekendMeetingPage() {
  const match = useRouteMatch<{ week_id?: string }>();
  const week_id =
    match?.params.week_id ?? format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
  const [settings_open, set_settings_open] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/reminders" />
          </IonButtons>
          <IonTitle>Weekend Meeting</IonTitle>
          <IonButtons slot="end">
            <SettingsIconButton on_click={() => set_settings_open(true)} />
          </IonButtons>
        </IonToolbar>
        <WeekendSmsSettingsModal
          is_open={settings_open}
          on_dismiss={() => set_settings_open(false)}
        />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        <IonList>
          <WeekNavigation week_id={week_id} />
          <WeekendAssignmentList week_id={week_id} />
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default WeekendMeetingPage;
