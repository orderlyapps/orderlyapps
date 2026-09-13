import type { AvAssignmentID } from "../schemas/av-assignment.ts";
import type { IonicColor } from "../../../ui/types/ionic-color.ts";
import type { AvParticipationType } from "./av-participation-type-labels.ts";

export type AvAssignmentGroup = {
  id: string;
  title: string;
  color: IonicColor;
  is_header: boolean;
  assignment_id?: AvAssignmentID;
  publisher?: string;
  base_path: string;
  week_id: string;
};

export type PublisherSortOrder = "alphabetical" | "weeks_away_closest" | "avg_weeks_between";

export const sortOrderLabels: Record<PublisherSortOrder, string> = {
  alphabetical: "Alphabetical",
  weeks_away_closest: "Weeks away from closest assignment",
  avg_weeks_between: "Average weeks between assignments",
};

export type GenderFilter = "all" | "male" | "female";

export interface AvPublisherFilter {
  gender: GenderFilter;
  min_weeks_away_closest: number;
  min_avg_weeks_between: number;
  participation_types: AvParticipationType[];
  stat_participation_types: AvParticipationType[];
}

export interface AvFilterSortPreset {
  id: string;
  name: string;
  filter: AvPublisherFilter;
  sort_order: PublisherSortOrder;
}
