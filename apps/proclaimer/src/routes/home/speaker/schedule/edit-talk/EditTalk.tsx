import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getTheocraticWeekLabel } from "@amodeo/proclaimer/util/date/getTheocraticWeekLabel";
import { EditTalkHeader, EditTalkContent } from "@amodeo/proclaimer/feature/speaker";

function EditTalkPage() {
  const { week_id } = useParams<{ week_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <EditTalkHeader
          title={getTheocraticWeekLabel(week_id)}
          back_href={`/home/speaker/schedule/${week_id}`}
        />
      </IonHeader>
      <IonContent className="content-wide">
        <EditTalkContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
}

export default EditTalkPage;
