import React from 'react';
import { AnalyzeAnswer } from '../../../@types/entities/AnalyzeAnswer';
import { AnalyzesAnalyze } from '../Analyze/Analyze';

import s from './List.module.scss';

interface Props {
  isEditable: boolean;
  analyzes: AnalyzeAnswer[];
  onDelete: (id: number) => void;
}

export const AnalyzesList = ({ isEditable, analyzes, onDelete }: Props) => {
  return (
    <div className={s.list}>
      {analyzes.map(analyze => (
        <AnalyzesAnalyze
          key={analyze.id}
          onDelete={() => {
            onDelete(analyze.id);
          }}
          isEditable={isEditable}
          analyze={analyze}
        />
      ))}
    </div>
  );
};
