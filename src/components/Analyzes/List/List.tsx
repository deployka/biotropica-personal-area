import React from 'react';
import { AnalyzeAnswer } from '../../../@types/entities/AnalyzeAnswer';
import { AnalyzesAnalyze } from '../Analyze/Analyze';

import s from './List.module.scss';

interface Props {
  analyzes: AnalyzeAnswer[];
}

export const AnalyzesList = ({ analyzes }: Props) => {
  return (
    <div className={s.list}>
      {analyzes.map(analyze => (
        <AnalyzesAnalyze key={analyze.id} analyze={analyze} />
      ))}
    </div>
  );
};
