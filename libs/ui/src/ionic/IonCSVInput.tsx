import { useCallback } from 'react';
import { csv2json } from 'json-2-csv';
import { IonButton, IonIcon } from '@ionic/react';
import { pushOutline } from 'ionicons/icons';

export const IonCSVInput = ({ setData }: { setData: (data: any) => void }) => {
  const handleFileImport = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = (event.target?.result as string) || '';
        const json = csv2json(content, { delimiter: { eol: '\r\n' } });
        setData(json);
      };
      reader.readAsText(file);
    },
    []
  );

  const openFileDialog = () => {
    (document as any).getElementById('csv-upload').click();
  };

  return (
    <>
      <input
        type="file"
        id="csv-upload"
        style={{ display: 'none' }}
        onChange={handleFileImport}
        accept=".csv"
      />

      <IonButton onClick={openFileDialog} expand="block">
        Import CSV File
        <IonIcon slot="end" icon={pushOutline}></IonIcon>
      </IonButton>
    </>
  );
};
