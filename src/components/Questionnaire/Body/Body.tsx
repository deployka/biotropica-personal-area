import React, { useEffect, useState } from 'react';

import { QuestionnaireProgress } from '../Progress/Progress';
import { QuestionnaireNav } from '../Nav/Nav';
import { Question } from '../../Question/Question';

import s from './Body.module.scss';

type Props = {
  title: string;
  type: 'select' | 'multiselect' | 'text' | 'number';
  progress: {
    currentIndex: number;
    total: number;
  };
  placeholder?: string;
  options?: {
    value: string;
    label: string;
  }[];
  onNext(value: string): void;
  onPrev(): void;
};

export const QuestionnaireBody = (props: Props) => {
  const {
    title,
    type,
    progress,
    placeholder = 'Введите ответ',
    options = [],
    onNext,
    onPrev,
  } = props;
  const [answer, setAnswer] = useState<string>('');
  const [multiAnswer, setMultiAnswer] = useState<string[]>([]);

  const handleClickNext = () => {
    if (['select', 'number', 'text'].includes(type)) onNext(answer);
    if (type === 'multiselect') onNext(JSON.stringify(multiAnswer));
  };

  useEffect(() => {
    if (answer) setAnswer('');
    if (multiAnswer.length) setMultiAnswer([]);
  }, [progress]);

  return (
    <div className={s.questionnaire}>
      <QuestionnaireProgress options={progress} />

      <Question
        title={title}
        placeholder={placeholder}
        questionNumber={progress.currentIndex + 1}
        answer={answer}
        multiAnswer={multiAnswer}
        setAnswer={setAnswer}
        setMultiAnswer={setMultiAnswer}
        type={type}
      />

      <QuestionnaireNav
        progress={progress}
        onNext={handleClickNext}
        onPrev={onPrev}
      />
    </div>
  );
};
