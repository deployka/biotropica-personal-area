import React, { useState } from 'react';

import s from '../Question.module.scss';

type Props = {
  onAnswer(val: string): void;
};

export const TextQuestion = ({ onAnswer }: Props) => {
  const [value, setValue] = useState('');
  return (
    <input
      className={s.question__input}
      type='text'
      value={value}
      placeholder='Введите ответ'
      onBlur={() => onAnswer(value)}
      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
    />
  );
};
