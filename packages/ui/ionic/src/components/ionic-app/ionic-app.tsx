import { IonApp, setupIonicReact } from "@ionic/react";
import type { ReactNode } from "react";
import { initFontSize } from "@amodeo/utils";
import { initTheme } from "../../hooks/use-theme/use-theme.ts";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.class.css";

import "@amodeo/utils/font-size.css";

export interface IonicAppProps {
  children: ReactNode;
}

setupIonicReact();
initTheme();
initFontSize();

export function IonicApp({ children }: IonicAppProps) {
  return <IonApp>{children}</IonApp>;
}
