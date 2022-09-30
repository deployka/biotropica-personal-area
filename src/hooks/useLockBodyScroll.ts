import { useEffect } from 'react';

export function useLockBodyScroll() {
  useEffect(() => {
    console.log('mount');

    document.body.style.overflow = 'hidden';
    return () => {
      console.log('unmount');

      document.body.style.overflow = 'auto';
    };
  }, []);
}
