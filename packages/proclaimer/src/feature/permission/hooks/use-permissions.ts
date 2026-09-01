import { useLiveQuery } from "@tanstack/react-db";
import { cleanPermissionCollection } from "../../cleaning/index.ts";
import { reportPermissionCollection } from "../../reports/index.ts";
import { secretaryPermissionCollection } from "../../../database/collections/secretary-permission.ts";
import { elderPermissionCollection } from "../../../database/collections/elder-permission.ts";
import { clamOverseerPermissionCollection } from "../../midweek/index.ts";
import { serviceOverseerPermissionCollection } from "../../../database/collections/service-overseer-permission.ts";
import { cobePermissionCollection } from "../../../database/collections/cobe-permission.ts";
import { territoryServantPermissionCollection } from "../../../database/collections/territory-servant-permission.ts";
import { avOverseerPermissionCollection } from "../../av/index.ts";
import { speakerPermissionCollection } from "../../../database/collections/speaker-permission.ts";
import { weekendPermissionCollection } from "../../weekend/index.ts";
import { reminderPermissionCollection } from "../../../database/collections/reminder-permission.ts";
import { eventPermissionCollection } from "../../event/index.ts";
import { watchtowerPermissionCollection } from "../../../database/collections/watchtower-permission.ts";
import { ministerialServantPermissionCollection } from "../../../database/collections/ministerial-servant-permission.ts";
import { congregationAdminCollection } from "../../../database/collections/congregation-admin.ts";
import { meetingAttendancePermissionCollection } from "../../meeting-attendance/index.ts";
import { authUserCollection } from "../../../database/collections/auth-user.ts";
import { useAuthSession } from "./use-auth-session.ts";
import { useStoredCongregation } from "../../congregation/utils/use-stored-congregation.ts";

interface Permissions {
  has_cleaning: boolean;
  has_reports: boolean;
  has_secretary: boolean;
  has_elder: boolean;
  has_ministerial_servant: boolean;
  has_clam_overseer: boolean;
  has_service_overseer: boolean;
  has_cobe: boolean;
  has_territory_servant: boolean;
  has_av_overseer: boolean;
  has_speaker: boolean;
  has_weekend: boolean;
  has_reminders: boolean;
  has_events: boolean;
  has_watchtower: boolean;
  has_meeting_attendance: boolean;
  can_read_meeting_attendance: boolean;
  has_congregation_admin: boolean;
  is_super_admin: boolean;
  is_authenticated: boolean;
  is_loaded: boolean;
}

export function usePermissions(): Permissions {
  const session = useAuthSession();
  const stored_congregation = useStoredCongregation();
  const auth_user_id = session?.user?.id;
  const congregation_id = stored_congregation?.id;
  const { data: clean_permissions } = useLiveQuery((q) =>
    q.from({ cp: cleanPermissionCollection }),
  );
  const { data: report_permissions } = useLiveQuery((q) =>
    q.from({ rp: reportPermissionCollection }),
  );
  const { data: secretary_permissions } = useLiveQuery((q) =>
    q.from({ sp: secretaryPermissionCollection }),
  );
  const { data: elder_permissions } = useLiveQuery((q) =>
    q.from({ ep: elderPermissionCollection }),
  );
  const { data: clam_permissions } = useLiveQuery((q) =>
    q.from({ cp: clamOverseerPermissionCollection }),
  );
  const { data: service_permissions } = useLiveQuery((q) =>
    q.from({ sop: serviceOverseerPermissionCollection }),
  );
  const { data: cobe_permissions } = useLiveQuery((q) => q.from({ cop: cobePermissionCollection }));
  const { data: territory_permissions } = useLiveQuery((q) =>
    q.from({ tp: territoryServantPermissionCollection }),
  );
  const { data: av_permissions } = useLiveQuery((q) =>
    q.from({ ap: avOverseerPermissionCollection }),
  );
  const { data: speaker_permissions } = useLiveQuery((q) =>
    q.from({ sp: speakerPermissionCollection }),
  );
  const { data: weekend_permissions } = useLiveQuery((q) =>
    q.from({ wp: weekendPermissionCollection }),
  );
  const { data: reminder_permissions } = useLiveQuery((q) =>
    q.from({ rp: reminderPermissionCollection }),
  );
  const { data: event_permissions } = useLiveQuery((q) =>
    q.from({ ep: eventPermissionCollection }),
  );
  const { data: watchtower_permissions } = useLiveQuery((q) =>
    q.from({ wp: watchtowerPermissionCollection }),
  );
  const { data: ministerial_servant_permissions } = useLiveQuery((q) =>
    q.from({ msp: ministerialServantPermissionCollection }),
  );
  const { data: meeting_attendance_permissions } = useLiveQuery((q) =>
    q.from({ map: meetingAttendancePermissionCollection }),
  );
  const { data: congregation_admins } = useLiveQuery((q) =>
    q.from({ ca: congregationAdminCollection }),
  );
  const { data: auth_users } = useLiveQuery((q) => q.from({ au: authUserCollection }));

  if (session === undefined) {
    return {
      has_cleaning: false,
      has_reports: false,
      has_secretary: false,
      has_elder: false,
      has_ministerial_servant: false,
      has_clam_overseer: false,
      has_service_overseer: false,
      has_cobe: false,
      has_territory_servant: false,
      has_av_overseer: false,
      has_speaker: false,
      has_weekend: false,
      has_reminders: false,
      has_events: false,
      has_watchtower: false,
      has_meeting_attendance: false,
      can_read_meeting_attendance: false,
      has_congregation_admin: false,
      is_super_admin: false,
      is_authenticated: false,
      is_loaded: false,
    };
  }

  if (!auth_user_id || !congregation_id) {
    return {
      has_cleaning: false,
      has_reports: false,
      has_secretary: false,
      has_elder: false,
      has_ministerial_servant: false,
      has_clam_overseer: false,
      has_service_overseer: false,
      has_cobe: false,
      has_territory_servant: false,
      has_av_overseer: false,
      has_speaker: false,
      has_weekend: false,
      has_reminders: false,
      has_events: false,
      has_watchtower: false,
      has_meeting_attendance: false,
      can_read_meeting_attendance: false,
      has_congregation_admin: false,
      is_super_admin: false,
      is_authenticated: !!auth_user_id,
      is_loaded: true,
    };
  }

  const is_super_admin = auth_users.some(
    (au) => au.auth_user_id === auth_user_id && au.is_super_admin,
  );

  const has_congregation_admin = congregation_admins.some(
    (ca) => ca.auth_user_id === auth_user_id && ca.congregation_id === congregation_id,
  );

  const has_cleaning = clean_permissions.some(
    (cp) =>
      cp.auth_user_id === auth_user_id && cp.congregation_id === congregation_id && cp.can_edit,
  );

  const has_reports = report_permissions.some(
    (rp) => rp.auth_user_id === auth_user_id && (rp.can_read || rp.can_edit),
  );

  const has_secretary = secretary_permissions.some(
    (sp) =>
      sp.auth_user_id === auth_user_id && sp.congregation_id === congregation_id && sp.can_edit,
  );

  const has_elder = elder_permissions.some(
    (ep) =>
      ep.auth_user_id === auth_user_id && ep.congregation_id === congregation_id && ep.can_edit,
  );

  const has_clam_overseer = clam_permissions.some(
    (cp) =>
      cp.auth_user_id === auth_user_id && cp.congregation_id === congregation_id && cp.can_edit,
  );

  const has_service_overseer = service_permissions.some(
    (sop) =>
      sop.auth_user_id === auth_user_id && sop.congregation_id === congregation_id && sop.can_edit,
  );

  const has_cobe = cobe_permissions.some(
    (cop) =>
      cop.auth_user_id === auth_user_id && cop.congregation_id === congregation_id && cop.can_edit,
  );

  const has_territory_servant = territory_permissions.some(
    (tp) =>
      tp.auth_user_id === auth_user_id && tp.congregation_id === congregation_id && tp.can_edit,
  );

  const has_av_overseer = av_permissions.some(
    (ap) =>
      ap.auth_user_id === auth_user_id && ap.congregation_id === congregation_id && ap.can_edit,
  );

  const has_speaker = speaker_permissions.some(
    (sp) =>
      sp.auth_user_id === auth_user_id && sp.congregation_id === congregation_id && sp.can_edit,
  );

  const has_weekend = weekend_permissions.some(
    (wp) =>
      wp.auth_user_id === auth_user_id && wp.congregation_id === congregation_id && wp.can_edit,
  );

  const has_reminders = reminder_permissions.some(
    (rp) =>
      rp.auth_user_id === auth_user_id && rp.congregation_id === congregation_id && rp.can_edit,
  );

  const has_events = event_permissions.some(
    (ep) =>
      ep.auth_user_id === auth_user_id && ep.congregation_id === congregation_id && ep.can_edit,
  );

  const has_watchtower = watchtower_permissions.some(
    (wp) =>
      wp.auth_user_id === auth_user_id && wp.congregation_id === congregation_id && wp.can_edit,
  );

  const has_ministerial_servant = ministerial_servant_permissions.some(
    (msp) =>
      msp.auth_user_id === auth_user_id && msp.congregation_id === congregation_id && msp.can_edit,
  );

  const has_meeting_attendance = meeting_attendance_permissions.some(
    (map) =>
      map.auth_user_id === auth_user_id && map.congregation_id === congregation_id && map.can_edit,
  );

  const can_read_meeting_attendance = meeting_attendance_permissions.some(
    (map) =>
      map.auth_user_id === auth_user_id &&
      map.congregation_id === congregation_id &&
      (map.can_read || map.can_edit),
  );

  return {
    has_cleaning,
    has_reports,
    has_secretary,
    has_elder,
    has_ministerial_servant,
    has_clam_overseer,
    has_service_overseer,
    has_cobe,
    has_territory_servant,
    has_av_overseer,
    has_speaker,
    has_weekend,
    has_reminders,
    has_events,
    has_watchtower,
    has_meeting_attendance,
    can_read_meeting_attendance,
    has_congregation_admin,
    is_super_admin,
    is_authenticated: true,
    is_loaded: true,
  };
}
