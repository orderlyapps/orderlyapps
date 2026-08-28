import { IonButton } from "@ionic/react";
import type { IonicColor } from "../../../../../types/ionic-color.ts";
import { Icon } from "../../../../icons/Icon.tsx";

interface SmsIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  on_click: () => void;
}

export function SmsIconButton({
  color,
  fill = "clear",
  size = "default",
  disabled = false,
  on_click,
}: SmsIconButtonProps) {
  return (
    <IonButton color={color} fill={fill} size={size} disabled={disabled} onClick={on_click}>
      <Icon slot="icon-only" name="message" />
    </IonButton>
  );
}
