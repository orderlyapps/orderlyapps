import type { DoNotCall as DoNotCallBase } from "@amodeo/proclaimer/database/schemas/do-not-call";

export type DoNotCall = DoNotCallBase & {
  street: string;
  suburb: string;
};
