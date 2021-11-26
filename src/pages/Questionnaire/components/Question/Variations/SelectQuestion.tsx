import React from 'react';

import s from '../Question.module.scss';

type Props = {
  value: string;
  options?: {
    value: string;
    label: string;
  }[];
  onChange(val: string): void;
};

export const SelectQuestion = ({ value, options, onChange }: Props) => {
  const isBig = options && options.length < 3;

  return (
    <div className={isBig ? s.big__buttons__select : s.small__buttons__select}>
      {options &&
        options.map((option) => (
          <button
            className={`${isBig ? s.big__button : s.small__button} ${
              option.value === value && s.selected
            }`}
            onClick={() => {
              if (value === option.value) return;
              onChange(option.value);
            }}
          >
            {option.label}
          </button>
        ))}
    </div>
  );
};
