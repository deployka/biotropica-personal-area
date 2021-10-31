import s from './RecommendedCard.module.scss';
import { GlobalSvgSelector } from '../../../../../assets/icons/global/GlobalSvgSelector';
import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { RecommendationType } from '../../../../../store/ducks/recommendation/contracts/state';

interface Props {
  type: RecommendationType;
  setActiveType: Dispatch<SetStateAction<RecommendationType>>;
  activeType: RecommendationType;
  amount: number;
}

interface Options {
  color: string;
  name: string;
}

export const RecommendedCard = ({
  type,
  setActiveType,
  activeType,
  amount,
}: Props) => {
  function onClick() {
    setActiveType(type);
  }

  function getOptionsByType(type: RecommendationType): Options {
    switch (type) {
      case RecommendationType.NUTRITION:
        return {
          name: 'Питание',
          color: 'yellow',
        };
      case RecommendationType.WORKOUT:
        return {
          name: 'Тренировки',
          color: 'green',
        };
      default:
        return {
          name: 'Неизвестно',
          color: 'black',
        };
    }
  }
  return (
    <div
      onClick={onClick}
      className={classNames(s.recommended__card, {
        [s.active]: activeType === type,
      })}
    >
      <div className={s.card__title}>{getOptionsByType(type).name}</div>
      <div className={s.card__recommendations}>
        <span className={s.recommendations__amount}>
          рекомендаций: {amount}
        </span>
      </div>
      <button className={s.btn__expand}>
        <GlobalSvgSelector id="next-rounded" />
      </button>
      <div
        style={{ background: getOptionsByType(type).color }}
        className={s.card__status}
      ></div>
    </div>
  );
};
