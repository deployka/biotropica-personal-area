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
}

export const AnalyzesCard = ({ analyzes, analyzeTypes }: Props) => {
  return (
    <div className={s.analyzesCard}>
      <div className={s.header}>
        <div className={s.title}>
          <p>Анализы</p>
        </div>
      </div>
      <AnalyzeTypes analyzeTypes={analyzeTypes} />
      <Analyzes analyzes={analyzes} />
    </div>
  );
};
