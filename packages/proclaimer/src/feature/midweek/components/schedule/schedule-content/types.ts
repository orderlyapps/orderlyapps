import type { IonicColor } from "../../../../../ui/types/ionic-color.ts";

export type ScheduleContentProps = {
  week_id: string;
  base_path: string;
};

export type AssignmentRow = {
  id: string;
  week_id: string;
  title: string;
  color: IonicColor;
  publisher?: string;
  assistant?: string;
  pin_to_first_column?: boolean;
  is_read_only?: boolean;
  base_path: string;
};
