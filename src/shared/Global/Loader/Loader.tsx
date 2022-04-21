import React from 'react';
import s from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={s.loader}>
      <div className={s.loaderLine}></div>
    </div>
  );
};
