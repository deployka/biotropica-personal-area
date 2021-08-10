import s from './RecommendedCard.module.scss';
import { GlobalSvgSelector } from '../../../../../assets/icons/global/GlobalSvgSelector';
import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

interface Props {
  options: any;
  setActive: Dispatch<SetStateAction<number>>;
  active: number;
  i: number;
}

export const RecommendedCard = ({ options, setActive, active, i }: Props) => {
  function onClick() {
    setActive(i);
  }
  return (
    <div
      onClick={onClick}
      className={classNames({
        [s.recommended__card]: true,
        [s.active]: active === i,
      })}
    >
      <div className={s.card__title}>{options.title}</div>
      <div className={s.card__recommendations}>
        <span className={s.recommendations__amount}>{options.amount}</span>
        {'  '}
        рекомендации
      </div>
      <button className={s.btn__expand}>
        <GlobalSvgSelector id="next-rounded" />
      </button>
      <div
        style={{ background: options.color }}
        className={s.card__status}
      ></div>
    </div>
  );
};
