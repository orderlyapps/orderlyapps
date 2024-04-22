import { PDFViewer } from '@react-pdf/renderer';
import { Select } from '@ui';
import { useState } from 'react';
import PublicTalkPDF from '../../pdf/PublicTalkPDF';

export const PDFFormatTesting = () => {
  const [file, setTool] = useState(0);
  const files = [<PublicTalkPDF></PublicTalkPDF>];

  const options = [{ label: 'PublicTalkPDF' }];

  const handleOnValueChange = (value: number) => {
    setTool(value);
  };

  return (
    <div className="full centered p-4 gap-2">
      <Select
        placeholder="Choose PDF"
        onValueChange={handleOnValueChange}
        options={options}
      ></Select>

      <div className="full centered">
        <PDFViewer
          showToolbar
          style={{
            border: '1px solid rgba(0,0,0,0.3)',
            height: '100vh',
            width: '100vw',
          }}
        >
          {files[file]}
        </PDFViewer>
      </div>
    </div>
  );
};

export default PDFFormatTesting;
