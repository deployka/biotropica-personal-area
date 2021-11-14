import s from './RecommendedCard.module.scss';
import { GlobalSvgSelector } from '../../../../../assets/icons/global/GlobalSvgSelector';
import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { RecommendationType } from '../../../../../store/ducks/recommendation/contracts/state';

interface Props {
  type: RecommendationType;
  setActiveType: Dispatch<SetStateAction<RecommendationType | null>>;
  activeType: RecommendationType | null;
  amount: number;
  options: Options;
}

export interface Options {
  color: string;
  name: string;
}

export const RecommendedCard = ({
  type,
  setActiveType,
  activeType,
  amount,
  options,
}: Props) => {
  function onClick() {
    setActiveType(type);
  }

  return (
    <div
      onClick={onClick}
      className={classNames(s.card, {
        [s.active]: activeType === type,
      })}
    >
      <div className={s.title}>
        <p>{options.name}</p>
      </div>
      <div className={s.recommendations}>
        <p>рекомендаций: {amount}</p>
      </div>
      <div className={s.expand}>
        <GlobalSvgSelector id="next-rounded" />
      </div>
      <div style={{ background: options.color }} className={s.status}></div>
    </div>
  );
};
