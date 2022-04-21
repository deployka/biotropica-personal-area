import React, { useEffect } from 'react';
import s from './PopupBackground.module.scss';

interface Props {
  open: boolean | undefined;
}

export const PopupBackground = ({ open }: Props) => {
  useEffect(() => {
    document.body.style.overflow = open
      ? 'hidden'
      : 'auto';
  }, [open]);
  return <div className={(open && s.back) || ''}></div>;
};
