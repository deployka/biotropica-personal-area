import React from 'react';
import s from './Loader.module.scss';

interface Props {}

export const Loader = ({}: Props) => {
  return (
    <div className={s.loader}>
      <div className={s.loaderLine}></div>
    </div>
  );
};
