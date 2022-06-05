import React, { useState } from 'react';
import { QuestionHeader } from './Header/Header';
import { QuestionMultiSelect } from './MultiSelect/MultiSelect';
import { QuestionNumber } from './Number/Number';

import s from './Question.module.scss';
import { QuestionSelect } from './Select/Select';
import { QuestionText } from './Text/Text';

type Props = {
  title: string;
  placeholder: string;
  questionNumber: number;
  answer: string;
  multiAnswer: string[];
  setAnswer: (value: string) => void;
  setMultiAnswer: (values: string[]) => void;
  options?: {
    value: string;
    label: string;
  }[];
  type: 'select' | 'multiselect' | 'text' | 'number';
};

export const Question = ({
  title,
  answer,
  multiAnswer,
  placeholder,
  questionNumber,
  setAnswer,
  setMultiAnswer,
  options = [],
  type,
}: Props) => {
  const questionVariations = {
    number: (
      <QuestionNumber
        value={Number(answer)}
        placeholder={placeholder}
        onChange={val => setAnswer(String(val))}
      />
    ),
    text: (
      <QuestionText
        value={String(answer)}
        placeholder={placeholder}
        onChange={setAnswer}
      />
    ),
    select: (
      <QuestionSelect value={answer} onChange={setAnswer} options={options} />
    ),
    multiselect: (
      <QuestionMultiSelect
        value={multiAnswer}
        onChange={setMultiAnswer}
        options={options}
      />
    ),
  };

  return (
    <div className={s.question}>
      <QuestionHeader title={title} questionNumber={questionNumber} />
      {questionVariations[type]}
    </div>
  );
};
