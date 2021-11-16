import React from 'react';
import { Analyze } from '../../../../../store/ducks/analyze/contracts/state';

import s from './AnalyzesCard.module.scss';

interface Props {
  analyzeTypes: Analyze[];
}

export const AnalyzeTypes = ({ analyzeTypes }: Props) => {
  return (
    <div className={s.card__analyzes__text__list}>
      {analyzeTypes.map((analyze: Analyze) => (
        <div key={analyze.id} className={s.card__analyzes__text}>
          • <span className={s.card__tests__item__answer}>{analyze.title}</span>
        </div>
      ))}
    </div>
  );
};
