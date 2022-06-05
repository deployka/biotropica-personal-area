import React from 'react';
import classNames from 'classnames';

import s from './Number.module.scss';

type Props = {
  value: number;
  placeholder: string;
  onChange(val: number): void;
};

export const QuestionNumber = ({ value, placeholder, onChange }: Props) => {
  return (
    <input
      className={classNames(s.textInput, s.without__arrows)}
      type="number"
      value={value.toString()}
      placeholder={placeholder}
      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(Number(e.target.value))
      }
    />
  );
};
