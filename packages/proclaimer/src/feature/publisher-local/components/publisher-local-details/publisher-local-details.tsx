import type { PublisherLocal } from "../../index.ts";
import { AddressList } from "./components/address-list/address-list.tsx";
import { EmailList } from "./components/email-list/email-list.tsx";
import { EmergencyContactList } from "./components/emergency-contact-list/emergency-contact-list.tsx";
import { PhoneList } from "./components/phone-list/phone-list.tsx";
import { PublisherDates } from "./components/publisher-dates/publisher-dates.tsx";

interface Props {
  publisher: PublisherLocal;
  read_only?: boolean;
  on_share_coordinates?: (coords: { lat: number; lng: number }) => void;
}

export function PublisherLocalDetails({
  publisher,
  read_only = false,
  on_share_coordinates,
}: Props) {
  return (
    <>
      <PublisherDates
        publisher_id={publisher.publisher_id}
        birth_date={publisher.birth_date}
        baptism_date={publisher.baptism_date}
        read_only={read_only}
      />
      <AddressList
        publisher_id={publisher.publisher_id}
        address={publisher.address ?? []}
        read_only={read_only}
        on_share_coordinates={on_share_coordinates}
      />
      <PhoneList
        publisher_id={publisher.publisher_id}
        phone={publisher.phone ?? []}
        read_only={read_only}
      />
      <EmailList
        publisher_id={publisher.publisher_id}
        email={publisher.email ?? []}
        read_only={read_only}
      />
      <EmergencyContactList
        publisher_id={publisher.publisher_id}
        emergency_contact={publisher.emergency_contact ?? []}
        read_only={read_only}
      />
    </>
  );
}
