import type { PublisherLocal } from "@amodeo/proclaimer/feature/publisher-local";

export type SharePayload =
  | {
      type: "publisher-local";
      data: PublisherLocal[];
    }
  | {
      type: "heartbeat";
    };
