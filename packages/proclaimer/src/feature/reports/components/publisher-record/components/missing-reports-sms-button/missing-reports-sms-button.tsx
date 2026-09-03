import { IonButton, IonIcon } from "@ionic/react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";
import type { MonthKey } from "../../../missing-reports-list/utils/get-previous-months.ts";
import { buildMissingReportsSms, buildSmsUrl } from "../../utils/build-missing-reports-sms.ts";

interface MissingReportsSmsButtonProps {
  publisher_name: string;
  missing_months: MonthKey[];
  is_almost_inactive: boolean;
  overseer_phone: string;
}

export function MissingReportsSmsButton({
  publisher_name,
  missing_months,
  is_almost_inactive,
  overseer_phone,
}: MissingReportsSmsButtonProps) {
  const body = buildMissingReportsSms({
    publisher_name,
    missing_months,
    is_almost_inactive,
  });

  return (
    <IonButton
      color={is_almost_inactive ? "warning" : "primary"}
      fill="outline"
      size="default"
      expand="block"
      className="ion-margin-horizontal"
      style={{ maxWidth: 360, marginInline: "auto" }}
      onClick={() => {
        window.location.href = buildSmsUrl(overseer_phone, body);
      }}
    >
      <IonIcon slot="start" icon={chatbubbleEllipsesOutline} />
      {is_almost_inactive ? "SMS Overseer - Inactive Risk" : "SMS Overseer"}
    </IonButton>
  );
}
