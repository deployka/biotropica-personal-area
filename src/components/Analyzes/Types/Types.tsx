import React from 'react';
import { Analyze } from '../../../store/ducks/analyze/contracts/state';

import s from './Types.module.scss';

interface Props {
  analyzeTypes: Analyze[];
}

export const AnalyzesTypes = ({ analyzeTypes }: Props) => {
  return (
    <div className={s.types}>
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
