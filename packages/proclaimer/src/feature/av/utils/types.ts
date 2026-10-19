import type { AvAssignmentID } from "../schemas/av-assignment.ts";
import type { IonicColor } from "../../../ui/types/ionic-color.ts";

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
