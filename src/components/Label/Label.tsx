import React from 'react';

import s from './Label.module.scss';

interface Props {
  value: string;
}

const Label = ({ value }: Props) => {
  return (
    <label className={s.label}>
      {value}
    </label>
  );
};

export default Label;
