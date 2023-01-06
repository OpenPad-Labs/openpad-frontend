import { useEffect, useState } from 'react';

const Device = () => {
  const [web, SetWeb] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') SetWeb(window?.navigator.userAgent);
  }, []);
  const mobileEnv = ['Android', 'iPhone', 'iPad', 'IPod'];
  if (!web) return null;
  let isMobile = false;

  mobileEnv.forEach((mobileEnvStr: string) => {
    if (web.indexOf(mobileEnvStr) !== -1) isMobile = true;
  });
  return isMobile;
};

export default Device;
