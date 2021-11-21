import React from 'react';
import { Analyze } from '../../../../../store/ducks/analyze/contracts/state';

import s from './AnalyzesCard.module.scss';

interface Props {
  analyzeTypes: Analyze[];
}

export const AnalyzeTypes = ({ analyzeTypes }: Props) => {
  return (
    <div className={s.analyzesTypes}>
      {analyzeTypes.map((analyze: Analyze) => (
        <div key={analyze.id} className={s.text}>
          <p>
            • <span className={s.answer}>{analyze.title}</span>
          </p>
        </div>
      ))}
    </div>
  );
};
