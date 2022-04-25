import React from 'react';
import s from './AnalyzesCard.module.scss';
import {
  Analyze,
  AnalyzeAnswer,
} from '../../../../../store/ducks/analyze/contracts/state';
import { AnalyzeTypes } from './AnalyzeTypes';
import { Analyzes } from './Analyzes';

interface Props {
  analyzes: AnalyzeAnswer[];
  analyzeTypes: Analyze[];
  isLoadingComment: boolean;
  onAddComment: (comment: string, analyzeId: number) => void;
  onDeleteComment: (id: number) => void;
}

export const AnalyzesCard = ({
  analyzes,
  analyzeTypes,
  onAddComment,
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
        onDeleteComment={onDeleteComment}
        isLoadingComment={isLoadingComment}
        onAddComment={onAddComment}
        analyzes={analyzes}
      />
    </div>
  );
};
