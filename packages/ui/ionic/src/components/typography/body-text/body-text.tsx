import { IonText } from "@ionic/react";
import type { CSSProperties, ReactNode } from "react";
import type { FontSize, IonicColor } from "@amodeo/utils";

export interface BodyTextProps {
  children: ReactNode;
  color?: IonicColor;
  size?: FontSize;
  bold?: boolean;
  italic?: boolean;
  balance?: boolean;
  pretty?: boolean;
  className?: string;
  style?: CSSProperties;
  slot?: string;
}

export function BodyText({
  children,
  color,
  size = "md",
  bold = false,
  italic = false,
  balance = false,
  pretty = false,
  className,
  style,
  slot,
}: BodyTextProps) {
  const getTextStyle = (): CSSProperties => {
    const textStyle: CSSProperties = {};

    switch (size) {
      case "xs":
        textStyle.fontSize = "0.75rem";
        break;
      case "sm":
        textStyle.fontSize = "0.875rem";
        break;
      case "lg":
        textStyle.fontSize = "1.125rem";
        break;
      case "xl":
        textStyle.fontSize = "1.25rem";
        break;
      case "2xl":
        textStyle.fontSize = "1.5rem";
        break;
      default: // md
        textStyle.fontSize = "1rem";
    }

    if (bold) textStyle.fontWeight = "bold";
    if (italic) textStyle.fontStyle = "italic";

    return textStyle;
  };

  const wrapStyle: CSSProperties | undefined = balance
    ? { display: "inline-block", textWrap: "balance" }
    : pretty
      ? { display: "inline-block", textWrap: "pretty" }
      : undefined;

  return (
    <IonText
      {...(color && { color })}
      {...(slot && { slot })}
      style={{ ...getTextStyle(), ...style }}
      className={className}
    >
      {wrapStyle ? <span style={wrapStyle}>{children}</span> : children}
    </IonText>
  );
}
