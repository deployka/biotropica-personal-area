import { useEffect, useState } from 'react';

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (document.documentElement.clientWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);
  return isMobile;
};
