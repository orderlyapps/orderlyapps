import type { NotAtHome as NotAtHomeBase } from "@amodeo/proclaimer/database/schemas/not-at-home";

export type NotAtHome = NotAtHomeBase & {
  street: string;
  suburb: string;
};
