import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, person, settings } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import AboutPage from "./routes/pages/tabs/settings/about/index.tsx";
import DetailsPage from "./routes/pages/tabs/home/details/index.tsx";
import EditProfilePage from "./routes/pages/tabs/profile/edit/index.tsx";
import HomeTabPage from "./routes/pages/tabs/home/index.tsx";
import ProfileTabPage from "./routes/pages/tabs/profile/index.tsx";
import SettingsTabPage from "./routes/pages/tabs/settings/index.tsx";

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tabs/home" component={HomeTabPage} />
            <Route exact path="/tabs/home/details" component={DetailsPage} />
            <Route exact path="/tabs/profile" component={ProfileTabPage} />
            <Route exact path="/tabs/profile/edit" component={EditProfilePage} />
            <Route exact path="/tabs/settings" component={SettingsTabPage} />
            <Route exact path="/tabs/settings/about" component={AboutPage} />
            <Redirect exact from="/" to="/tabs/home" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/tabs/home">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/tabs/profile">
              <IonIcon icon={person} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/tabs/settings">
              <IonIcon icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}
