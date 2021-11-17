import s from './AnalyzesCard.module.scss';
import {
  Analyze,
  AnalyzeAnswer,
} from '../../../../../store/ducks/analyze/contracts/state';
import { AnalyzeTypes } from './AnalyzeTypes';
import { Analyzes } from './Analyzes';
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
      <button onClick={onShowMoreClick} className={s.card__more__btn}>
        {isShowMore ? 'загрузить еще' : 'скрыть'}
      </button>
    </div>
  );
};
