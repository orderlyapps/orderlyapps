import { IonButton, IonIcon } from "@ionic/react";
import { peopleOutline } from "ionicons/icons";
import type { IonicColor } from "../../../../../types/ionic-color.ts";

interface ReturnVisitIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  on_click: () => void;
}

export function ReturnVisitIconButton({
  color,
  fill = "clear",
  size = "default",
  disabled = false,
  on_click,
}: ReturnVisitIconButtonProps) {
  return (
    <IonButton color={color} fill={fill} size={size} disabled={disabled} onClick={on_click}>
      <IonIcon slot="icon-only" icon={peopleOutline} />
    </IonButton>
  );
}
