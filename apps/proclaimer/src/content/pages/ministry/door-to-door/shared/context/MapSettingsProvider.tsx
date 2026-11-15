import { type ReactNode } from "react";
import { SelectedMapProvider } from "./SelectedMapContext";
import { MapDisplayModeProvider } from "./MapDisplayModeContext";
import { MapStyleProvider } from "./MapStyleContext";
import { QuickLinksProvider } from "./QuickLinksContext";
import { NotAtHomeStaleDaysProvider } from "./NotAtHomeStaleDaysContext";
import { NotAtHomeVisibilityProvider } from "./NotAtHomeVisibilityContext";

export function MapSettingsProvider({ children }: { children: ReactNode }) {
  return (
    <SelectedMapProvider>
      <MapDisplayModeProvider>
        <MapStyleProvider>
          <QuickLinksProvider>
            <NotAtHomeStaleDaysProvider>
              <NotAtHomeVisibilityProvider>{children}</NotAtHomeVisibilityProvider>
            </NotAtHomeStaleDaysProvider>
          </QuickLinksProvider>
        </MapStyleProvider>
      </MapDisplayModeProvider>
    </SelectedMapProvider>
  );
}
