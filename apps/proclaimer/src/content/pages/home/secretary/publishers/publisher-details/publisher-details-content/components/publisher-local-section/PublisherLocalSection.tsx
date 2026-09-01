import { useState } from "react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import {
  publisherLocalCollection,
  PhoneList,
  AddressList,
  EmailList,
  EmergencyContactList,
  PublisherDates,
} from "@amodeo/proclaimer/feature/publisher-local";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { DownloadVcardButton } from "./components/download-vcf-button/DownloadVcardButton";
import { MapShareActionSheet } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/map-share-action-sheet/MapShareActionSheet";

interface Props {
  publisher_id: string;
  read_only?: boolean;
}

export function PublisherLocalSection({ publisher_id, read_only = false }: Props) {
  const { data } = useLiveQuery((q) =>
    q.from({ p: publisherLocalCollection }).where(({ p }) => eq(p.publisher_id, publisher_id)),
  );

  const local = data?.[0];
  const [share_coords, set_share_coords] = useState<{ lat: number; lng: number } | null>(null);

  if (!local) {
    if (read_only) return null;
    return (
      <>
        <Space />
        <IonItem
          button
          detail={false}
          onClick={() =>
            publisherLocalCollection.insert({
              publisher_id,
              confidential_id: crypto.randomUUID(),
              phone: [],
              address: [],
              email: [],
              emergency_contact: [],
              birth_date: "",
              baptism_date: "",
              version: {
                created_by: "",
                updated_by: "",
                created_at: Date.now(),
                updated_at: Date.now(),
              },
            })
          }
        >
          <IonIcon icon={addCircleOutline} slot="start" color="primary" />
          <IonLabel>Add Contact Information</IonLabel>
        </IonItem>
      </>
    );
  }

  return (
    <>
      <PublisherDates
        publisher_id={publisher_id}
        birth_date={local.birth_date ?? ""}
        baptism_date={local.baptism_date ?? ""}
        read_only={read_only}
      />
      <PhoneList publisher_id={publisher_id} phone={local.phone ?? []} read_only={read_only} />
      <AddressList
        publisher_id={publisher_id}
        address={local.address ?? []}
        read_only={read_only}
        on_share_coordinates={set_share_coords}
      />
      <EmailList publisher_id={publisher_id} email={local.email ?? []} read_only={read_only} />
      <EmergencyContactList
        publisher_id={publisher_id}
        emergency_contact={local.emergency_contact ?? []}
        read_only={read_only}
      />
      <Space />
      <DownloadVcardButton publisher_id={publisher_id} />
      <MapShareActionSheet
        lat={share_coords?.lat ?? 0}
        lng={share_coords?.lng ?? 0}
        is_open={share_coords !== null}
        on_dismiss={() => set_share_coords(null)}
      />
    </>
  );
}
