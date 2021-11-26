import React from 'react';

import s from '../Question.module.scss';

type Props = {
  value: string;
  placeholder: string;
  onChange(val: string): void;
};

export const TextQuestion = ({ value, placeholder, onChange }: Props) => {
  return (
    <input
      className={s.question__input}
      type='text'
      value={value}
      placeholder={placeholder}
      onBlur={() => onChange(value)}
      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
    />
  );
};
