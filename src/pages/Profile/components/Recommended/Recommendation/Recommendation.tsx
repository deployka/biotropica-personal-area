import s from './Recommendation.module.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Recommendation as IRecommendation } from '../../../../../store/ducks/recommendation/contracts/state';
import moment from 'moment';
interface Props {
  recommendation: IRecommendation;
}

export const Recommendation = ({ recommendation }: Props) => {
  return (
    <div className={s.recommendation}>
      <div className={s.card__date}>
        Создано:{' '}
        {moment(new Date(recommendation.createdAt), 'YYYYMMDD').fromNow()},{' '}
        {moment(recommendation.createdAt).format('Do MMMM YYYY г.')}
      </div>
      <div className={s.recommended__card__content}>
        <div className={s.card__post}>{recommendation.content}</div>
      </div>
    </div>
  );
};
