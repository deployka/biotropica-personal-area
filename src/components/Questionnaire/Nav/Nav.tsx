import classNames from 'classnames';
import React, { useCallback, useEffect } from 'react';
import { QuestionnaireSvgSelector } from '../../../assets/icons/questionnaire/QuestionnaireSvgSelector';
import { Loader } from '../../../shared/Global/Loader/Loader';

import s from './Nav.module.scss';

type Props = {
  isNextEnabled: boolean;
  progress: {
    currentIndex: number;
    total: number;
  };
  isNextLoading: boolean;
  onNext(): void;
  onPrev(): void;
};

export const QuestionnaireNav = ({
  onNext,
  isNextLoading,
  onPrev,
  progress,
  isNextEnabled,
}: Props) => {
  const handlerKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') onNext();
    },
    [onNext],
  );

  useEffect(() => {
    window.addEventListener('keypress', handlerKeyPress);
    return () => {
      window.removeEventListener('keypress', handlerKeyPress);
    };
  }, [handlerKeyPress]);

  return (
    <div className={s.nav}>
      {/* {progress.currentIndex !== 1 && (
        <button className={s.btn__prev} onClick={onPrev}>
          <div className={s.btn__prev__icon}>
            <QuestionnaireSvgSelector id="arrow" />
          </div>
          <div className={s.btn__prev__text}>назад</div>
        </button>
      )} */}

      <button
        className={classNames(s.nextBtn, !isNextEnabled ? s.disabled : '')}
        onClick={onNext}
      >
        {isNextLoading ? (
          <div className={s.text}>
            <p>запись ответа...</p>
          </div>
        ) : (
          <>
            <div className={s.text}>
              <p>
                {progress.currentIndex !== progress.total
                  ? 'далее'
                  : 'завершить'}
              </p>
            </div>
            <div className={s.icon}>
              <QuestionnaireSvgSelector id="arrow" />
            </div>
          </>
        )}
      </button>
    </div>
  );
};
