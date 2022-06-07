import React from 'react';
import { AnalyzeAnswer } from '../../../../../@types/entities/AnalyzeAnswer';
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
