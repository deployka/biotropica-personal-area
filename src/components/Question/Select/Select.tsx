import React from 'react';
import classNames from 'classnames';

import s from './Select.module.scss';

type Props = {
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange(val: string): void;
};

export const QuestionSelect = ({ value, options, onChange }: Props) => {
  const isLongLable = options.find(it => it.label.length > 25);
  const isBig = options.length < 3 || isLongLable;
  const isMedium = !isBig && options.find(it => it.label.length > 3);
  const classes = classNames(
    s.select,
    isBig ? s.big : s.small,
    isMedium && s.medium,
  );

  return (
    <div className={classes}>
      {options.map(option => (
        <button
          key={option.value}
          className={classNames(
            s.button,
            option.value === value ? s.selected : '',
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
