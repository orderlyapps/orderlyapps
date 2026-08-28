import { IonList } from "@ionic/react";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";
import { ResetSettingsButton } from "@util/app/reset-settings-button/ResetSettingsButton";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { AppQrCode } from "./components/app-qr-code/AppQrCode";

export function SettingsContent() {
  const { has_elder } = usePermissions();

  return (
    <>
      <IonList>
        <NavItem label="Profile" to="/settings/profile" />
        <NavItem label="Appearance" to="/settings/appearance" />
      </IonList>
      {has_elder && (
        <>
          <Space size="lg" />
          <AppQrCode />
        </>
      )}
      <Space size="lg" />
      <ResetSettingsButton />
    </>
  );
}
