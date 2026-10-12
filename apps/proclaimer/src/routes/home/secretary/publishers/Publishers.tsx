import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { useState } from "react";
import {
  Publishers,
  PublisherFilterSelect,
  type PublisherFilter,
} from "@amodeo/proclaimer/feature/publisher";
import { SearchInput } from "@amodeo/proclaimer/ui/components/inputs/search/SearchInput";
import { Heading } from "@amodeo/proclaimer/ui/components/display/text/heading/Heading";
import { localStorageKeys } from "@amodeo/proclaimer/util/localStorageKeys";
import { useAccordionState } from "@amodeo/proclaimer/util/hooks/use-accordion-state";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";

const default_filter: PublisherFilter = {
  gender: "all",
  standing: "all",
  type: "all",
  archived: "exclude",
};

function PublishersPage() {
  const [search_term, setSearchTerm] = useState("");
  const [filter, set_filter] = useState<PublisherFilter>(default_filter);
  const { value, onIonChange } = useAccordionState(
    localStorageKeys.publishersFilterAccordion,
    "filters",
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/secretary" />
          </IonButtons>
          <IonTitle>Publishers</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <SearchInput value={search_term} on_change={setSearchTerm} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAccordionGroup value={value} onIonChange={onIonChange}>
          <IonAccordion value="filters">
            <IonItem slot="header">
              <IonLabel>
                <Heading>Filters</Heading>
              </IonLabel>
            </IonItem>
            <IonList slot="content">
              <PublisherFilterSelect filter={filter} on_change={set_filter} />
              <Space />
            </IonList>
          </IonAccordion>
        </IonAccordionGroup>
        <Publishers
          base_path="/home/secretary/publishers"
          search_term={search_term}
          filter={filter}
        />
      </IonContent>
    </IonPage>
  );
}

export default PublishersPage;
