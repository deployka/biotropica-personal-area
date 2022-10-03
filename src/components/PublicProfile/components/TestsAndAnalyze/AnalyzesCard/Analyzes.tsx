import React, { useState } from 'react';

import { Analyze } from './Analyze';
import { AnalyzeAnswer } from '../../../../../@types/entities/AnalyzeAnswer';

import s from './AnalyzesCard.module.scss';

interface Props {
  onAddComment: (comment: string, analyzeId: number) => void;
  analyzes: AnalyzeAnswer[];
  isLoadingComment: boolean;
  currentUserId: number;
  onDeleteComment: (id: number) => void;
}

export const Analyzes = ({
  analyzes,
  onAddComment,
  currentUserId,
  isLoadingComment,
  onDeleteComment,
}: Props) => {
  return (
    <div className={s.documentsList}>
      {analyzes.map(analyze => (
        <Analyze
          onDeleteComment={onDeleteComment}
          isLoadingComment={isLoadingComment}
          currentUserId={currentUserId}
          onAddComment={onAddComment}
          key={analyze.id}
          analyze={analyze}
        />
      ))}
    </div>
  );
};
