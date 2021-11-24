import React, { useState } from 'react';
import classNames from 'classnames';

import s from '../Question.module.scss';

type Props = {
  onAnswer(val: number): void;
};

export const NumberQuestion = ({ onAnswer }: Props) => {
  const [value, setValue] = useState(0);
  return (
    <input
      className={classNames(s.question__input, s.without__arrows)}
      type='number'
      value={value.toString()}
      placeholder='Введите ответ'
      onBlur={() => onAnswer(value)}
      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(Number(e.target.value))
      }
    />
  );
};
