import { RefObject, useEffect } from 'react';

type ClickOutsideEvent = MouseEvent | TouchEvent;

export function useOnClickOutside<T extends HTMLElement, V extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: ClickOutsideEvent) => void,
  exception?: RefObject<V>,
) {
  useEffect(() => {
    const listener = (event: ClickOutsideEvent) => {
      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        exception?.current?.contains(event.target as Node)
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
