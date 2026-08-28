import { Body } from "../body/Body.tsx";
import type { IonicColor } from "../../../../types/ionic-color.ts";
import type { Size } from "../../../../types/size.ts";

interface HeadingProps {
  children: React.ReactNode;
  color?: IonicColor;
  size?: Size;
  bold?: boolean;
  italic?: boolean;
  balance?: boolean;
  pretty?: boolean;
  className?: string;
}

export function Heading({
  children,
  color = "primary",
  size = "xl",
  bold = false,
  italic = false,
  balance = false,
  pretty = false,
  className,
}: HeadingProps) {
  return (
    <Body
      color={color}
      size={size}
      bold={bold}
      italic={italic}
      balance={balance}
      pretty={pretty}
      className={className}
    >
      {children}
    </Body>
  );
}
