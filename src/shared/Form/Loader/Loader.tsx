import React from 'react';
import classNames from 'classnames';
import s from './Loader.module.scss';

export const Loader = () => {
  return (
    <>
      <div className={classNames(s.loader, s.loader__quart)}></div>
    </>
  );
};
