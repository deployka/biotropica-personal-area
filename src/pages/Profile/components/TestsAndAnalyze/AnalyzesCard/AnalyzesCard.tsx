import PerfectScrollbar from 'react-perfect-scrollbar';
import s from './AnalyzesCard.module.scss';
import {
  Analyze,
  AnalyzeAnswer,
} from '../../../../../store/ducks/analyze/contracts/state';
import { Dispatch, SetStateAction, useState } from 'react';
import { AnalyzeTypes } from './AnalyzeTypes';
import { Analyzes } from './Analyzes';
interface Props {
  analyzes: AnalyzeAnswer[];
  onAddAnalyzeClick: () => void;
  onShowMoreClick: (
    setShowMore: Dispatch<SetStateAction<boolean>>,
    showMore: boolean
  ) => void;
  analyzeTypes: Analyze[];
}

export const AnalyzesCard = ({
  analyzes,
  onAddAnalyzeClick,
  analyzeTypes,
  onShowMoreClick,
}: Props) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className={s.analyzes__card}>
      <div className={s.card__header}>
        <div className={s.card__title}>Анализы</div>
        <button onClick={onAddAnalyzeClick} className={s.card__update}>
          загрузить новые
        </button>
      </div>
      <AnalyzeTypes analyzeTypes={analyzeTypes} />
      <Analyzes analyzes={analyzes} />
      <button
        onClick={() => onShowMoreClick(setShowMore, showMore)}
        className={s.card__more__btn}
      >
        {!showMore ? 'загрузить еще' : 'скрыть'}
      </button>
    </div>
  );
};
