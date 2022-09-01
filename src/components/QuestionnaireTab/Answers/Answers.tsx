import React from 'react';
import type { Answer } from '../../../@types/entities/Answer';

import s from './Answers.module.scss';

interface Props {
  answers: Answer[];
}

export const QuestionnaireTabAnswers = ({ answers }: Props) => {
  function getCurrentAnswer(answer: Answer) {
    try {
      return JSON.parse(answer.text)?.join(', ');
    } catch (error) {
      return answer.text;
    }
  }
  return (
    <div className={s.testCard}>
      <div className={s.list}>
        {answers.map((answer, i) => (
          <div className={s.item} key={answer.id}>
            <p>
              {i + 1}. {answer.question.title}:{' '}
              <span className={s.answer}>
                {getCurrentAnswer(answer) || 'Вы не дали ответ'}
              </span>
            </p>
          </div>
        ))}
      </div>
      {/* TODO: */}
      {/* <div className={s.moreBtn}>посмотреть всё</div> */}
    </div>
  );
};
