import { IonItem, IonText } from '@ionic/react';
import { IonPickerModalInput } from '@ui';
import { SelectSpeaker } from './SelectSpeaker';
import { SelectTheme } from './SelectTheme';
import { useSchedule } from './../../global/hooks/useSchedule';
import { SelectChairman } from './SelectChairman';
import { SelectReader } from './SelectReader';
import { PUBLIC_TALK_THEMES_OPTIONS } from '../helper/publicTalkData';

export const WeekendMeetingForm = () => {
  const schedule = useSchedule.use.schedule();

  return (
    <>
      <IonPickerModalInput
        label={'Speaker'}
        value={schedule.weSpeaker}
        content={SelectSpeaker}
      ></IonPickerModalInput>

      <IonPickerModalInput
        label={'Theme'}
        value={schedule.weTheme ? `No. ${schedule.weTheme}` : ''}
        content={SelectTheme}
        lines={schedule.weTheme ? 'none' : 'full'}
      ></IonPickerModalInput>

      {schedule.weTheme && (
        <IonItem>
          <IonText className="ion-text-end" slot="end">
            {schedule.weTheme
              ? PUBLIC_TALK_THEMES_OPTIONS[schedule.weTheme - 1]?.display
              : ''}
          </IonText>
        </IonItem>
      )}

      <IonPickerModalInput
        label={'Chairman'}
        value={schedule.weChairman}
        content={SelectChairman}
      ></IonPickerModalInput>

      <IonPickerModalInput
        label={'Reader'}
        value={schedule.weReader}
        content={SelectReader}
      ></IonPickerModalInput>
    </>
  );
};
