import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@data';
import { useEffect } from 'react';
import { useSBAuth } from './useSupabaseAuth';
import { IonAvatar, IonButton, IonItem, IonLabel, IonList } from '@ionic/react';

export const SupabaseAuth = () => {
  const session = useSBAuth.use.session();
  const setSBAuth = useSBAuth.use.setSBAuth();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSBAuth(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSBAuth(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    await supabase.auth.getSession().then(({ data: { session } }) => {
      setSBAuth(session);
    });
  };

  const url = import.meta.env.DEV
    ? 'http://localhost:3000/settings/'
    : 'https://experimental.orderly.pages.dev/settings';

  if (!session) {
    return (
      <IonList inset className="ion-padding">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
          showLinks={false}
          onlyThirdPartyProviders
          redirectTo={url}
        />
      </IonList>
    );
  }

  return (
    <IonList inset className="ion-padding-vertical">
      <IonItem lines="none">
        <IonAvatar slot="start">
          <img
            alt="Silhouette of a person's head"
            src={session?.user.user_metadata.picture}
          />
        </IonAvatar>
        <IonLabel>
          <strong>{session?.user.user_metadata.full_name}</strong>
          <br />
          {session?.user.user_metadata.email}
        </IonLabel>
      </IonItem>
      <IonButton
        expand="block"
        onClick={handleLogOut}
        slot="end"
        className="ion-padding-horizontal"
        size="small"
      >
        Log Out
      </IonButton>
    </IonList>
  );
};

export default SupabaseAuth;
