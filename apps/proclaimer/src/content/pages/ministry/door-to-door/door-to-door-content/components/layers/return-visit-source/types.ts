import type { ReturnVisitLocal } from "@amodeo/proclaimer/database/rxdb/collections/return-visit";

export type ReturnVisit = ReturnVisitLocal & {
  street: string;
  suburb: string;
};
