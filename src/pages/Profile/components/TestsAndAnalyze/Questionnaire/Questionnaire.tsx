import React from 'react';
import s from './Questionnaire.module.scss';

import editSvg from '../../../../../assets/icons/profile/edit.svg';
import { Link } from 'react-router-dom';

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
        <div className={s.updateBtn}>
          <Link to={'/questionnaire'}>
            <div className={s.icon}>
              <img src={editSvg} alt="" />
            </div>
            <p className={s.text}>редактировать</p>
          </Link>
        </div>
      </div>
      <div className={s.list}>
        {answers.map((answer, i) => (
          <div className={s.item} key={answer.id}>
            <p>
              {answer.question.order}. {answer.question.title}:{' '}
              <span className={s.answer}>{getCurrentAnswer(answer)}</span>
            </p>
          </div>
        ))}
      </div>
      {/* TODO: */}
      {/* <div className={s.moreBtn}>посмотреть всё</div> */}
    </div>
  );
};
