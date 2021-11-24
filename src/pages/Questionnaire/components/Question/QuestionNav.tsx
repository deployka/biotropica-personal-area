import React from 'react';
import { QuestionnaireSvgSelector } from '../../../../assets/icons/questionnaire/QuestionnaireSvgSelector';
import s from './Question.module.scss';

type Props = {
  progress: {
    current: number;
    of: number;
  };
  onNext(): void;
  onPrev(): void;
};

export const QuestionNav = ({ onNext, onPrev, progress }: Props) => {
  return (
    <div className={s.nav__btns}>
      {progress.current !== 1 ? (
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
          {progress.current !== progress.of ? 'далее' : 'завершить'}
        </div>
        <div className={s.btn__next__icon}>
          <QuestionnaireSvgSelector id='arrow' />
        </div>
      </button>
    </div>
  );
};
