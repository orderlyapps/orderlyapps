// a function that will run every time the app starts

export const startFunctions = () => {
    if (!localStorage.getItem('user')) {
      const currentTime = new Date().getTime();
      localStorage.setItem('user', currentTime.toString());
      localStorage.setItem('country', 'AU');
      localStorage.setItem('region', 'NSW');
      localStorage.setItem('congregation', 'test');
      localStorage.setItem('coordinates', '151.5510,32.7321');
      localStorage.setItem('bbox', '0,0,0,0');
    }
  };
  
  export default startFunctions;
  