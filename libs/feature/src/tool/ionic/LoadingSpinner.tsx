import { IonSpinner } from '@ionic/react';

export const LoadingSpinner = () => {
  return (
    <div className="full centered">
      <IonSpinner style={{ width: '15%', height: '15%' }}></IonSpinner>
    </div>
  );
};

export default LoadingSpinner;
