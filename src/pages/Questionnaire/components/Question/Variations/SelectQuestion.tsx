import classNames from 'classnames';
import React from 'react';

import s from '../Question.module.scss';

type Props = {
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange(val: string): void;
};

export const SelectQuestion = ({ value, options, onChange }: Props) => {
  const isBig = options && options.length < 3;

  return (
    <div className={classNames(s.select, isBig
      ? s.big
      : s.small)}>
      {options &&
        options.map(option => (
          <button
            key={option.value}
            className={classNames(
              s.button,
              option.value === value
                ? s.selected
                : ''
            )}
            onClick={() => {
              if (value === option.value) return;
              onChange(option.value);
            }}
          >
            <p>{option.label}</p>
          </button>
        ))}
    </div>
  );
};
