import React from 'react';
import classNames from 'classnames';
import s from './Loader.module.scss';

type Props = {
  color?: string;
};

export const Loader = ({ color }: Props) => {
  return (
    <>
      <div
        style={{ border: `3px solid ${color || 'rgba(255, 255, 255, 0.4)'}` }}
        className={classNames(s.loader, s.loader__quart)}
      ></div>
    </>
  );
};
