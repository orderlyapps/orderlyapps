import { IonButton } from "@ionic/react";
import type { IonicColor } from "../../../../../types/ionic-color.ts";
import { Icon } from "../../../../icons/Icon.tsx";

interface PDFIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  on_click: () => void;
}

export function PDFIconButton({
  color,
  fill = "clear",
  size = "default",
  disabled = false,
  on_click,
}: PDFIconButtonProps) {
  return (
    <IonButton color={color} fill={fill} size={size} disabled={disabled} onClick={on_click}>
      <Icon slot="icon-only" name="pdf" />
    </IonButton>
  );
}
