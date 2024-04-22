import { useEffect, useState } from 'react';
import {
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from '@ionic/react';
import type { ToggleCustomEvent } from '@ionic/react';
import { useTernaryDarkMode } from 'usehooks-ts';

export function ThemeToggle() {
  //   const [paletteToggle, setPaletteToggle] = useState(false);
  const {
    isDarkMode,
    ternaryDarkMode,
    setTernaryDarkMode,
    toggleTernaryDarkMode,
  } = useTernaryDarkMode();

  useEffect(() => {
    document.documentElement.classList.toggle('ion-palette-dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <IonList inset={true}>
        {/* <IonItem>
          <IonToggle
            checked={isDarkMode}
            onIonChange={toggleTernaryDarkMode}
            justify="space-between"
          >
            Dark Mode
          </IonToggle>
        </IonItem> */}

        <p>Current theme: {isDarkMode ? 'dark' : 'light'}</p>
        <p>ternaryMode: {ternaryDarkMode}</p>
        <IonItem>
          <IonSelect
            label="Theme"
            interface="popover"
            onIonChange={(ev) => setTernaryDarkMode(ev.detail.value)}
            // value={''}
          >
            <IonSelectOption value="light">Light</IonSelectOption>
            <IonSelectOption value="dark">Dark</IonSelectOption>
            <IonSelectOption value="system">Auto</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
    </>
  );
}
// export default Example;
