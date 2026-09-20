import type { PublisherLocal } from "../schemas/publisher-local.ts";

export type SharePayload =
  | {
      type: "publisher-local";
      data: PublisherLocal[];
    }
  | {
      type: "heartbeat";
    };
