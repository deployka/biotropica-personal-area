import React from 'react';
import { AnalyzeTypes } from '../Types/Types';
import { AnalyzeAnswer } from '../../../@types/entities/AnalyzeAnswer';
import { Analyze } from '../../../@types/entities/Analyze';
import { AnalyzesList } from '../List/List';
import { AnalyzesHeader } from '../Header/Header';

import s from './Card.module.scss';

interface Props {
  analyzes: AnalyzeAnswer[];
  analyzeTypes: Analyze[];
  onDelete: (id: number) => void;
  onAddAnalyzeClick: () => void;
}

export const AnalyzesCard = ({
  analyzes,
  analyzeTypes,
  onDelete,
  onAddAnalyzeClick,
}: Props) => {
  return (
    <div className={s.card}>
      <AnalyzesHeader onAddAnalyzeClick={onAddAnalyzeClick} />
      <AnalyzeTypes analyzeTypes={analyzeTypes} />
      <AnalyzesList onDelete={onDelete} analyzes={analyzes} />
      {/* TODO: сделать подгурзку анализова частями */}
      {/* <button onClick={onShowMoreClick} className={s.moreBtn}>
        {analyzes.length >= 2 ? <ShowMore /> : ''}
      </button> */}
    </div>
  );
};
