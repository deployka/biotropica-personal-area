import React from 'react';

import s from './Text.module.scss';

type Props = {
  value: string;
  placeholder: string;
  onChange(val: string): void;
};

export const QuestionText = ({ value, placeholder, onChange }: Props) => {
  return (
    <input
      className={s.textInput}
      type="text"
      value={value}
      placeholder={placeholder}
      onBlur={() => onChange(value)}
      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
    />
  );
};
