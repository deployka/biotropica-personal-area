import React from 'react';
import { Answer } from '../../../../../@types/entities/Answer';
import s from './Questionnaire.module.scss';

interface Props {
  answers: Answer[];
}

export const Questionnaire = ({ answers }: Props) => {
  function getCurrentAnswer(answer: Answer) {
    try {
      return JSON.parse(answer.text)?.join(', ');
    } catch (error) {
      return answer.text;
    }
  }
  return (
    <div className={s.testCard}>
      <div className={s.header}>
        <div className={s.title}>
          <p>Тестирование</p>
        </div>
      </div>
      <div className={s.list}>
        {answers.map(answer => (
          <div className={s.item} key={answer.id}>
            <p>
              {answer.question.order}. {answer.question.title}:{' '}
              <span className={s.answer}>{getCurrentAnswer(answer)}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
