import { IonicApp } from "@amodeo/ionic";
import { ProclaimerProvider } from "@amodeo/proclaimer";
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, person, settings as settingsIcon } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import AboutPage from "@/routes/pages/settings/about/index.tsx";
import DetailsPage from "@/routes/pages/home/details/index.tsx";
import EditProfilePage from "@/routes/pages/profile/edit/index.tsx";
import HomeTabPage from "@/routes/pages/home/index.tsx";
import ProfileTabPage from "@/routes/pages/profile/index.tsx";
import SettingsTabPage from "@/routes/pages/settings/index.tsx";

export default function App() {
  return (
    <ProclaimerProvider
      supabaseUrl={import.meta.env.VITE_SUPABASE_URL}
      supabaseAnonKey={import.meta.env.VITE_SUPABASE_ANON_KEY}
    >
      <IonicApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={HomeTabPage} />
              <Route exact path="/home/details" component={DetailsPage} />
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
      </IonicApp>
    </ProclaimerProvider>
  );
}
