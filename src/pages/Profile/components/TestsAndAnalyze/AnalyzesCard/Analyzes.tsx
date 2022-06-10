import React, { useState } from 'react';
import { AnalyzeAnswer } from '../../../../../store/ducks/analyze/contracts/state';
import { Analyze } from './Analyze';

import s from './AnalyzesCard.module.scss';

interface Props {
  analyzes: AnalyzeAnswer[];
}

export const Analyzes = ({ analyzes }: Props) => {
  return (
    <div className={s.documentsList}>
      {analyzes.map(analyze => (
        <Analyze key={analyze.id} analyze={analyze} />
      ))}
    </div>
  );
};
