import React, { useState } from 'react';
import moment from 'moment';
import { AnalyzeAnswer } from '../../../../../store/ducks/analyze/contracts/state';

import s from './AnalyzesCard.module.scss';
import { Analyze } from './Analyze';

interface Props {
  onAddComment: (comment: string, analyzeId: number) => void;
  analyzes: AnalyzeAnswer[];
  isLoadingComment: boolean;
  onDeleteComment: (id: number) => void;
}

export const Analyzes = ({
  analyzes,
  onAddComment,
  isLoadingComment,
  onDeleteComment,
}: Props) => {
  return (
    <div className={s.documentsList}>
      {analyzes.map(analyze => (
        <Analyze
          onDeleteComment={onDeleteComment}
          isLoadingComment={isLoadingComment}
          onAddComment={onAddComment}
          key={analyze.id}
          analyze={analyze}
        />
      ))}
    </div>
  );
};
