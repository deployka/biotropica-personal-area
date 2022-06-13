import React from 'react';

import { AnalyzeTypes } from './AnalyzeTypes';
import { Analyzes } from './Analyzes';
import { AnalyzeAnswer } from '../../../../../@types/entities/AnalyzeAnswer';
import { Analyze } from '../../../../../@types/entities/Analyze';

import s from './AnalyzesCard.module.scss';

interface Props {
  analyzes: AnalyzeAnswer[];
  currentUserId: number;
  analyzeTypes: Analyze[];
  isLoadingComment: boolean;
  onAddComment: (comment: string, analyzeId: number) => void;
  onDeleteComment: (id: number) => void;
}

export const AnalyzesCard = ({
  analyzes,
  analyzeTypes,
  onAddComment,
  currentUserId,
  isLoadingComment,
  onDeleteComment,
}: Props) => {
  return (
    <div className={s.analyzesCard}>
      <div className={s.header}>
        <div className={s.title}>
          <p>Анализы</p>
        </div>
      </div>
      <AnalyzeTypes analyzeTypes={analyzeTypes} />
      <Analyzes
        currentUserId={currentUserId}
        onDeleteComment={onDeleteComment}
        isLoadingComment={isLoadingComment}
        onAddComment={onAddComment}
        analyzes={analyzes}
      />
    </div>
  );
};
