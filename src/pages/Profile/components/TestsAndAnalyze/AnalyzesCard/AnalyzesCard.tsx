import s from './AnalyzesCard.module.scss';
import documentSvg from '../../../../../assets/icons/profile/document.svg';
import { Analyze } from '../TestsAndAnalyze';
interface Props {
  analyzes: Analyze[];
}

export const AnalyzesCard = ({ analyzes }: Props) => {
  return (
    <div className={s.analyzes__card}>
      {' '}
      <div className={s.card__header}>
        <div className={s.card__title}>Анализы</div>
        <a href={'#'} className={s.card__update}>
          загрузить новые
        </a>
      </div>
      <div className={s.card__analyzes__text__list}>
        {analyzes.map((analyze: Analyze, i: number) => (
          <div key={analyze.fileName + i} className={s.card__analyzes__text}>
            •{'  '}
            <span className={s.card__tests__item__answer}>{analyze.info}</span>
          </div>
        ))}
      </div>
      <div className={s.card__analyzes__documents__list}>
        {analyzes.map((analyze: Analyze) => (
          <div key={analyze.fileName} className={s.document}>
            <div className={s.document__top}>
              <img src={documentSvg} className={s.document__img} />
              <a href={analyze.link} className={s.document__name}>
                {analyze.fileName}
              </a>
            </div>
            <div className={s.document__createdAt}>{analyze.createdAt}</div>
          </div>
        ))}
      </div>
      <div className={s.card__more__btn}>посмотреть всё</div>
    </div>
  );
};
