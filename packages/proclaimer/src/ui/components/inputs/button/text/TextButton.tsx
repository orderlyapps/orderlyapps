import { IonButton, IonIcon } from "@ionic/react";
import type { ComponentProps } from "react";
import type { IonicColor } from "../../../../types/ionic-color.ts";

type TextButtonProps = Omit<ComponentProps<typeof IonButton>, "onClick" | "color"> & {
  label: string;
  color?: IonicColor;
  icon?: ComponentProps<typeof IonIcon>["icon"];
  on_click?: () => void;
};

export function TextButton({
  label,
  color,
  icon,
  fill = "solid",
  size = "default",
  expand = "block",
  disabled = false,
  on_click,
  ...rest
}: TextButtonProps) {
  return (
    <IonButton
      {...rest}
      color={color}
      fill={fill}
      size={size}
      expand={expand}
      disabled={disabled}
      onClick={on_click}
      className="ion-margin-horizontal"
      style={{ maxWidth: 360, marginInline: "auto" }}
    >
      {icon && <IonIcon slot="start" icon={icon} />}
      {label}
    </IonButton>
  );
}
