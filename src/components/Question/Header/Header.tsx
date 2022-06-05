import React from 'react';

import s from './Header.module.scss';

type Props = {
  title: string;
  questionNumber: number;
};

export const QuestionHeader = ({ title, questionNumber }: Props) => {
  return (
    <div className={s.header}>
      <div className={s.number}>
        <p>{questionNumber} вопрос</p>
      </div>
      <div className={s.title}>
        <p>{title}</p>
      </div>
    </div>
  );
};
