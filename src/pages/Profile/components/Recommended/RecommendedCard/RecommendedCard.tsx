import s from './RecommendedCard.module.scss';
import { GlobalSvgSelector } from '../../../../../assets/icons/global/GlobalSvgSelector';

interface Props {
  options: any;
}

export const RecommendedCard = ({ options }: Props) => {
  return (
    <div className={s.recommended__card}>
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
