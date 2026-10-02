import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { LogoIcon } from "@amodeo/proclaimer/ui/components/icons/logo/LogoIcon";
import { getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";
import { useStoredPublisher } from "@amodeo/proclaimer/feature/publisher";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { HomeAssignments } from "@amodeo/proclaimer/feature/assignments";
import { HomeEvents } from "@amodeo/proclaimer/feature/event";
import { HomeTools } from "@amodeo/proclaimer/feature/permission";

function HomePage() {
  const publisher = useStoredPublisher();

  return (
    <IonPage>
      <IonHeader />
      <IonContent>
        <Space />
        <div className="ion-text-center ion-padding">
          <LogoIcon size="4xl" color="primary" />
          <div className="ion-text-center ion-margin">
            {publisher && (
              <Heading size="xl" color="primary">
                <div> Welcome </div>
                <div>{getPublisherDisplayName(publisher, "first_last")}</div>
              </Heading>
            )}
            {!publisher && (
              <Heading size="2xl" bold color="primary">
                Welcome to Proclaimer
              </Heading>
            )}
          </div>
        </div>

        <Space size="sm" />

        <HomeAssignments />

        <Space size="sm" />

        <HomeEvents />

        <Space size="sm" />

        <HomeTools />
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
