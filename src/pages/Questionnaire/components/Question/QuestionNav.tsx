import React from 'react';
import { QuestionnaireSvgSelector } from '../../../../assets/icons/questionnaire/QuestionnaireSvgSelector';
import s from './Question.module.scss';

type Props = {
  progress: {
    currentId: number;
    total: number;
  };
  onNext(): void;
  onPrev(): void;
};

export const QuestionNav = ({ onNext, onPrev, progress }: Props) => {
  return (
    <div className={s.nav__btns}>
      {progress.currentId !== 1 ? (
        <button className={s.btn__prev} onClick={onPrev}>
          <div className={s.btn__prev__icon}>
            <QuestionnaireSvgSelector id='arrow' />
          </div>
          <div className={s.btn__prev__text}>назад</div>
        </button>
      ) : (
        <div></div>
      )}

      <button className={s.btn__next} onClick={onNext}>
        <div className={s.btn__next__text}>
          {progress.currentId !== progress.total ? 'далее' : 'завершить'}
        </div>
        <div className={s.btn__next__icon}>
          <QuestionnaireSvgSelector id='arrow' />
        </div>
      </button>
    </div>
  );
};
