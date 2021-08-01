import classNames from 'classnames';
import React from 'react';

import s from './Label.module.scss';

interface Props {
  value: string;
  active: boolean;
}

export const Label = ({ value, active }: Props) => {
  return (
    <>
      <label className={classNames({ [s.label]: true, [s.active]: !!active })}>
        {value}
      </label>
    </>
  );
};
