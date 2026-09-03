import type { NotAtHome as NotAtHomeBase } from "@amodeo/proclaimer/feature/territory";

export type NotAtHome = NotAtHomeBase & {
  street: string;
  suburb: string;
};
