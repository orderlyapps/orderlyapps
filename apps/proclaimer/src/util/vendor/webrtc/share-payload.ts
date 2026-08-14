import type { PublisherLocal } from "@amodeo/proclaimer/database/rxdb/collections/publisher";

export type SharePayload =
  | {
      type: "publisher-local";
      data: PublisherLocal[];
    }
  | {
      type: "heartbeat";
    };
