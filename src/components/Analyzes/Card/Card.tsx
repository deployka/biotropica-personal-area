import React from 'react';
import { AnalyzeTypes } from '../Types/Types';
import { AnalyzeAnswer } from '../../../@types/entities/AnalyzeAnswer';
import { Analyze } from '../../../@types/entities/Analyze';
import { AnalyzesList } from '../List/List';
import { AnalyzesHeader } from '../Header/Header';

import s from './Card.module.scss';

interface Props {
  analyzes: AnalyzeAnswer[];
  onAddAnalyzeClick: () => void;
  onShowMoreClick: () => void;
  analyzeTypes: Analyze[];
  isShowMore: boolean;
}

export const AnalyzesCard = ({
  analyzes,
  onAddAnalyzeClick,
  analyzeTypes,
  onShowMoreClick,
  isShowMore,
}: Props) => {
  const ShowMore = () => {
    return <div>{isShowMore ? 'показать еще' : 'скрыть'}</div>;
  };
  return (
    <div className={s.card}>
      <AnalyzesHeader onAddAnalyzeClick={onAddAnalyzeClick} />
      <AnalyzeTypes analyzeTypes={analyzeTypes} />
      <AnalyzesList analyzes={analyzes} />
      {/* TODO: сделать подгурзку анализова частями */}
      {/* <button onClick={onShowMoreClick} className={s.moreBtn}>
        {analyzes.length >= 2 ? <ShowMore /> : ''}
      </button> */}
    </div>
  );
};
