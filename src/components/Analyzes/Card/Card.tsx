import React from 'react';
import {
  Analyze,
  AnalyzeAnswer,
} from '../../../store/ducks/analyze/contracts/state';
import { AnalyzesTypes } from '../Types/Types';
import { DocumentsList } from '../DocumentsList/DocumentsList';
import editSvg from '../../../assets/icons/profile/edit.svg';

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
      <AnalyzesTypes analyzeTypes={analyzeTypes} />
      <DocumentsList analyzes={analyzes} />

      <button onClick={onShowMoreClick} className={s.moreBtn}>
        {analyzes.length >= 2 ? <ShowMore /> : ''}
      </button>
    </div>
  );
};
