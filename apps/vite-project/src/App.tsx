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
import AboutPage from "@/routes/settings/about";
import AllCongregationsPage from "@/routes/home/proclaimer/features/congregations/all";
import CongregationDetailsPage from "@/routes/home/proclaimer/features/congregations/all/congregation";
import CongregationsPage from "@/routes/home/proclaimer/features/congregations";
import AllPublishersPage from "@/routes/home/proclaimer/features/publishers/all";
import PublisherDetailsPage from "@/routes/home/proclaimer/features/publishers/all/publisher";
import DetailsPage from "@/routes/home/details";
import EditProfilePage from "@/routes/profile/edit";
import FeaturesPage from "@/routes/home/proclaimer/features";
import HomeTabPage from "@/routes/home";
import ProclaimerPage from "@/routes/home/proclaimer";
import ProfileTabPage from "@/routes/profile";
import PublishersPage from "@/routes/home/proclaimer/features/publishers";
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
