import React, { ReactElement, useEffect } from 'react';

type Props = {
    children: ReactElement;
    onClickOutside: () => void;
    exceptions?: HTMLElement[];
}

export function ClickOutside(props: Props) {
  const wrapperRef = React.createRef<HTMLDivElement>();
  function handleClickOutside(event: MouseEvent) {
    if (
      wrapperRef &&
            !wrapperRef.current?.contains(event.target as Node)
    ) {
      event.stopPropagation();
      props.onClickOutside();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return <div ref={wrapperRef}>{props.children}</div>;
}
