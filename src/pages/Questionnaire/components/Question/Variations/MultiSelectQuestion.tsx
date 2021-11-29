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
    <div className={s.question__answer__selectors}>
      {options &&
        options.map((option) => (
          <div className={s.selector}>
            <div className={s.selector__title}>{option.label} </div>
            <div className={s.selector__btns}>
              <button
                className={`${s.selector__btn} ${
                  value.includes(option.value) && s.selected
                }`}
                onClick={() => {
                  if (value.includes(option.value)) return;
                  onChange([...value, option.value]);
                }}
              >
                да
              </button>
              <button
                className={`${s.selector__btn} ${
                  !value.includes(option.value) && s.selected
                }`}
                onClick={() => {
                  if (!value.includes(option.value)) return;
                  onChange(
                    value.filter((it) => {
                      return it !== option.value;
                    })
                  );
                }}
              >
                нет
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
