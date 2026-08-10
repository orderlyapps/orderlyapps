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
import AboutPage from "@/routes/pages/settings/about/index.tsx";
import AllCongregationsPage from "@/routes/pages/home/proclaimer/features/congregations/all/index.tsx";
import CongregationDetailsPage from "@/routes/pages/home/proclaimer/features/congregations/all/congregation/index.tsx";
import CongregationsPage from "@/routes/pages/home/proclaimer/features/congregations/index.tsx";
import AllPublishersPage from "@/routes/pages/home/proclaimer/features/publishers/all/index.tsx";
import PublisherDetailsPage from "@/routes/pages/home/proclaimer/features/publishers/all/publisher/index.tsx";
import DetailsPage from "@/routes/pages/home/details/index.tsx";
import EditProfilePage from "@/routes/pages/profile/edit/index.tsx";
import FeaturesPage from "@/routes/pages/home/proclaimer/features/index.tsx";
import HomeTabPage from "@/routes/pages/home/index.tsx";
import ProclaimerPage from "@/routes/pages/home/proclaimer/index.tsx";
import ProfileTabPage from "@/routes/pages/profile/index.tsx";
import PublishersPage from "@/routes/pages/home/proclaimer/features/publishers/index.tsx";
import SettingsTabPage from "@/routes/pages/settings/index.tsx";

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
                  <Route exact path="/home/details" component={DetailsPage} />
                  <Route exact path="/home/proclaimer" component={ProclaimerPage} />
                  <Route exact path="/home/proclaimer/features" component={FeaturesPage} />
                  <Route
                    exact
                    path="/home/proclaimer/features/publishers"
                    component={PublishersPage}
                  />
                  <Route
                    exact
                    path="/home/proclaimer/features/publishers/all"
                    component={AllPublishersPage}
                  />
                  <Route
                    exact
                    path="/home/proclaimer/features/publishers/all/:id"
                    component={PublisherDetailsPage}
                  />
                  <Route
                    exact
                    path="/home/proclaimer/features/congregations"
                    component={CongregationsPage}
                  />
                  <Route
                    exact
                    path="/home/proclaimer/features/congregations/all"
                    component={AllCongregationsPage}
                  />
                  <Route
                    exact
                    path="/home/proclaimer/features/congregations/all/:id"
                    component={CongregationDetailsPage}
                  />
                  <Route exact path="/profile" component={ProfileTabPage} />
                  <Route exact path="/profile/edit" component={EditProfilePage} />
                  <Route exact path="/settings" component={SettingsTabPage} />
                  <Route exact path="/settings/about" component={AboutPage} />
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
