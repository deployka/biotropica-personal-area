import React from 'react';
import classNames from 'classnames';

import s from '../Question.module.scss';

type Props = {
  value: number;
  placeholder: string;
  onChange(val: number): void;
};

export const NumberQuestion = ({ value, placeholder, onChange }: Props) => {
  return (
    <input
      className={classNames(s.question__input, s.without__arrows)}
      type='number'
      value={value.toString()}
      placeholder={placeholder}
      onBlur={() => onChange(value)}
      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(Number(e.target.value))
      }
    />
  );
};
