import React from 'react';
import { AnalyzeAnswer } from '../../../@types/entities/AnalyzeAnswer';
import { AnalyzesAnalyze } from '../Analyze/Analyze';

import s from './List.module.scss';

interface Props {
  isEditable: boolean;
  analyzes: AnalyzeAnswer[];
  isLoadingComment?: boolean;
  onDelete?: (id: number) => void;
  onAddComment: (comment: string, analyzeId: number) => void;
  onDeleteComment: (id: number) => void;
}

export const AnalyzesList = ({
  isEditable,
  analyzes,
  isLoadingComment,
  onAddComment,
  onDeleteComment,
  onDelete,
}: Props) => {
  return (
    <div className={s.list}>
      {analyzes.map(analyze => (
        <AnalyzesAnalyze
          key={analyze.id}
          onDelete={
            onDelete
              ? () => {
                  onDelete(analyze.id);
                }
              : undefined
          }
          isEditable={isEditable}
          analyze={analyze}
          currentUserId={0}
          isLoadingComment={isLoadingComment}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </div>
  );
};
