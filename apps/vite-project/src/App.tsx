import { ErrorBoundary, IonicApp } from "@amodeo/ionic";
import {
  OnboardingGuard,
  ProclaimerProvider,
  type ProclaimerOnboardingSettings,
} from "@amodeo/proclaimer";
import type { AppSettings } from "@amodeo/utils";
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, person, settings as settingsIcon } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import HomeTabPage from "@/routes/home";
import ProfileTabPage from "@/routes/profile";
import SettingsTabPage from "@/routes/settings";

export default function App({
  onboardingSettings,
}: {
  onboardingSettings: AppSettings<ProclaimerOnboardingSettings>;
}) {
  return (
    <ErrorBoundary>
      <ProclaimerProvider
        supabaseUrl={import.meta.env.VITE_SUPABASE_URL}
        supabaseAnonKey={import.meta.env.VITE_SUPABASE_ANON_KEY}
      >
        <IonicApp>
          <OnboardingGuard settings={onboardingSettings}>
            <IonReactRouter>
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/home" component={HomeTabPage} />
                  <Route exact path="/profile" component={ProfileTabPage} />
                  <Route exact path="/settings" component={SettingsTabPage} />
                  <Redirect exact from="/" to="/home" />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="home" href="/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="profile" href="/profile">
                    <IonIcon icon={person} />
                    <IonLabel>Profile</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="settings" href="/settings">
                    <IonIcon icon={settingsIcon} />
                    <IonLabel>Settings</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonReactRouter>
          </OnboardingGuard>
        </IonicApp>
      </ProclaimerProvider>
    </ErrorBoundary>
  );
}
