import React from 'react';

import s from './Progress.module.scss';

interface Progress {
  options: {
    currentIndex: number;
    total: number;
  };
}
export const QuestionnaireProgress = ({ options }: Progress) => {
  const { currentIndex, total } = options;
  const percantage = Math.round(((currentIndex + 1) / total) * 100);
  return (
    <div className={s.progress}>
      <div className={s.info}>
        <div className={s.counter}>
          <p>
            <span className={s.current}>{currentIndex + 1}</span>
            <span>{' / ' + total}</span>
          </p>
        </div>
        <div className={s.percentage}>
          <p>{percantage}%</p>
        </div>
      </div>
      <progress
        value={percantage}
        max="100"
        className={s.progressBar}
      ></progress>
    </div>
  );
};
