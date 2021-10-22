import React from 'react';
import s from './PopupBackground.module.scss';

interface Props {
  open: boolean | undefined;
}

export const PopupBackground = ({ open }: Props) => {
  return <div className={(open && s.back) || ''}></div>;
};
