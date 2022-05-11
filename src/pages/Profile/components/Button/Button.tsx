import React, { ReactNode } from 'react';
import s from './Button.module.scss';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export const Button = ({ onClick, children }: Props) => {
  return (
    <button onClick={onClick} className={s.block}>
      {children}
    </button>
  );
};
