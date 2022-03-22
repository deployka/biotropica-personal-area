import React from 'react';
import s from './AnalyzesCard.module.scss';
import {
  Analyze,
  AnalyzeAnswer,
} from '../../../../../store/ducks/analyze/contracts/state';
import { AnalyzeTypes } from './AnalyzeTypes';
import { Analyzes } from './Analyzes';

import editSvg from '../../../../../assets/icons/profile/edit.svg';

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
    <div className={s.analyzesCard}>
      <div className={s.header}>
        <div className={s.title}>
          <p>Анализы</p>
        </div>

        <button onClick={onAddAnalyzeClick} className={s.updateBtn}>
          <p>загрузить новые</p>
          <img src={editSvg} alt="" />
        </button>
      </div>
      <AnalyzeTypes analyzeTypes={analyzeTypes} />
      <Analyzes analyzes={analyzes} />

      <button onClick={onShowMoreClick} className={s.moreBtn}>
        {analyzes.length >= 2 ? <ShowMore /> : ''}
      </button>
    </div>
  );
};
