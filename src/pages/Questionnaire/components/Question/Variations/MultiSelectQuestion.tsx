import React, { useEffect, useState } from 'react';

import s from '../Question.module.scss';

type Props = {
  options?: {
    value: string;
    label: string;
  }[];

  onAnswer(val: string[]): void;
};

export const MultiSelectQuestion = ({ options, onAnswer }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => onAnswer(selected), [selected]);

  const onYes = (val: string) => {
    if (selected.includes(val)) return;
    setSelected([...selected, val]);
  };

  const onNo = (val: string) => {
    if (!selected.includes(val)) return;
    setSelected(
      selected.filter((it) => {
        return it !== val;
      })
    );
  };

  return (
    <div className={s.question__answer__selectors}>
      {options &&
        options.map((option) => (
          <div className={s.selector}>
            <div className={s.selector__title}>{option.label} </div>
            <div className={s.selector__btns}>
              <button
                className={`${s.selector__btn} ${
                  selected.includes(option.value) && s.selected
                }`}
                onClick={() => onYes(option.value)}
              >
                да
              </button>
              <button
                className={`${s.selector__btn} ${
                  !selected.includes(option.value) && s.selected
                }`}
                onClick={() => onNo(option.value)}
              >
                нет
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
