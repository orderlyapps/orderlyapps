import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { GroupDetailsHeader } from "@amodeo/proclaimer/feature/secretary";
import { GroupDetailsContent } from "@amodeo/proclaimer/feature/secretary";

function GroupDetailsPage() {
  const { group_id } = useParams<{ group_id: string }>();
  const [is_add_modal_open, set_is_add_modal_open] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <GroupDetailsHeader group_id={group_id} on_add_click={() => set_is_add_modal_open(true)} />
      </IonHeader>
      <IonContent className="content-wide">
        <GroupDetailsContent
          group_id={group_id}
          is_add_modal_open={is_add_modal_open}
          on_dismiss={() => set_is_add_modal_open(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default GroupDetailsPage;
