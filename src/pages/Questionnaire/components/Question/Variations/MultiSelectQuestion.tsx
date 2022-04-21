import React from 'react';

import s from '../Question.module.scss';

type Props = {
  value: string[];
  options: {
    value: string;
    label: string;
  }[];
  onChange(val: string[]): void;
};

export const MultiSelectQuestion = ({ value, options, onChange }: Props) => {
  return (
    <div className={s.multiSelect}>
      {options &&
        options.map(option => (
          <div key={option.value} className={s.selector}>
            <div className={s.title}>
              <p>{option.label}</p>
            </div>
            <div className={s.btnsBlock}>
              <button
                className={`${s.btn} ${
                  value.includes(option.value) && s.selected
                }`}
                onClick={() => {
                  if (value.includes(option.value)) return;
                  onChange([...value, option.value]);
                }}
              >
                <p>да</p>
              </button>
              <button
                className={`${s.btn} ${
                  !value.includes(option.value) && s.selected
                }`}
                onClick={() => {
                  if (!value.includes(option.value)) return;
                  onChange(
                    value.filter(it => {
                      return it !== option.value;
                    }),
                  );
                }}
              >
                <p>нет</p>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
