import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
} from "@ionic/react";
import { Icon } from "@amodeo/proclaimer/ui/components/icons/Icon";
import { Spinner } from "@amodeo/proclaimer/ui/components/display/spinner/Spinner";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { useCleaningSchedules, CleaningScheduleList } from "@amodeo/proclaimer/feature/cleaning";

function CleaningPage() {
  const { months, group_options, is_loading, can_edit, on_major_change, on_minor_change } =
    useCleaningSchedules();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Cleaning</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/home/elder/cleaning-schedule">
              <Icon slot="icon-only" name="pdf" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide remove-top-padding">
        {is_loading ? (
          <Spinner className="flex-center" />
        ) : (
          <>
            <CleaningScheduleList
              months={months}
              group_options={group_options}
              can_edit={can_edit}
              on_major_change={on_major_change}
              on_minor_change={on_minor_change}
            />
            <Space size="lg" />
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default CleaningPage;
