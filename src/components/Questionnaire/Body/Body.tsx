import React, { useEffect, useState } from 'react';

import { QuestionnaireProgress } from '../Progress/Progress';
import { QuestionnaireNav } from '../Nav/Nav';
import { Question } from '../../Question/Question';

import s from './Body.module.scss';
import { Question as IQuestion } from '../../../@types/entities/Question';

type Props = {
  question: IQuestion;
  isQuestionLoading: boolean;
  progress: {
    currentIndex: number;
    total: number;
  };
  onNext(value: string): void;
  onPrev(): void;
};

export const QuestionnaireBody = ({
  question,
  progress,
  isQuestionLoading,
  onNext,
  onPrev,
}: Props) => {
  const { title, type } = question;

  const [answer, setAnswer] = useState<string>('');
  const [multiAnswer, setMultiAnswer] = useState<string[]>([]);

  const handleClickNext = () => {
    if (['select', 'number', 'text'].includes(type) && answer) {
      onNext(answer);
    }
    if (type === 'multiselect') {
      onNext(JSON.stringify(multiAnswer));
    }
  };

  useEffect(() => {
    if (answer) setAnswer('');
    if (multiAnswer.length) setMultiAnswer([]);
  }, [progress]);

  useEffect(() => {
    console.log('effectAnswer', answer);
  }, [answer]);

  const options = question.allowedAnswers
    ? question.allowedAnswers.map(it => ({
        value: it,
        label: it,
      }))
    : [];

  return (
    <div className={s.questionnaire}>
      <QuestionnaireProgress options={progress} />

      {isQuestionLoading ? (
        <p>Мистер загрузка</p>
      ) : (
        <Question
          title={title}
          placeholder={title}
          questionNumber={progress.currentIndex + 1}
          answer={answer}
          multiAnswer={multiAnswer}
          setAnswer={value => setAnswer(value)}
          options={options}
          setMultiAnswer={setMultiAnswer}
          type={type}
        />
      )}

      <QuestionnaireNav
        isNextEnabled={!!answer || multiAnswer.length !== 0}
        progress={progress}
        onNext={handleClickNext}
        onPrev={onPrev}
      />
    </div>
  );
};
