import type { PublisherLocal } from "../schemas/publisher-local.js";
import { createVersion } from "../utils/version.js";
import { rxdb } from "../../../database/rxdb/database.js";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const publisherLocalCollection = createCollection(
  rxdbCollectionOptions<PublisherLocal>({
    rxCollection: rxdb.publisher,
    startSync: true,
  }),
);

export function upsertPublisherLocal(
  publisher_id: string,
  updater: (draft: PublisherLocal) => void,
): void {
  if (publisherLocalCollection.has(publisher_id)) {
    publisherLocalCollection.update(publisher_id, updater);
    return;
  }
  const draft: PublisherLocal = {
    publisher_id,
    confidential_id: crypto.randomUUID(),
    phone: [],
    address: [],
    email: [],
    emergency_contact: [],
    photo: [],
    version: createVersion(),
  };
  updater(draft);
  publisherLocalCollection.insert(draft);
}
