import type { DoNotCall as DoNotCallBase } from "@amodeo/proclaimer/feature/territory";

export type DoNotCall = DoNotCallBase & {
  street: string;
  suburb: string;
};
