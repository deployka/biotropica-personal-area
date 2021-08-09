import s from './AnalyzesCard.module.scss';
import documentSvg from '../../../../../assets/icons/profile/document.svg';
interface Props {
  options: any;
}

export const AnalyzesCard = ({ options }: Props) => {
  return (
    <div className={s.analyzes__card}>
      {' '}
      <div className={s.card__header}>
        <div className={s.card__title}>Анализы</div>
        <a href={options.updateUrl} className={s.card__update}>
          загрузить новые
        </a>
      </div>
      <div className={s.card__analyzes__text__list}>
        {options.analyzes.map((analyze: string) => (
          <div className={s.card__analyzes__text}>
            •{'  '}
            <span className={s.card__tests__item__answer}>{analyze}</span>
          </div>
        ))}
      </div>
      <div className={s.card__analyzes__documents__list}>
        {options.documents.map((document: any) => (
          <div className={s.document}>
            <div className={s.document__top}>
              <img src={documentSvg} className={s.document__img} />
              <a href={document.link} className={s.document__name}>
                {document.name}
              </a>
            </div>
            <div className={s.document__createdAt}>{document.createdAt}</div>
          </div>
        ))}
      </div>
      <div className={s.card__more__btn}>посмотреть всё</div>
    </div>
  );
};
