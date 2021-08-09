import s from './TestsCard.module.scss';

interface Props {
  options: any;
}

export const TestsCard = ({ options }: Props) => {
  return (
    <div className={s.tests__card}>
      <div className={s.card__header}>
        <div className={s.card__title}>Тестирование</div>
        <a href={options.updateUrl} className={s.card__update}>
          редактировать
        </a>
      </div>
      <div className={s.card__tests__list}>
        <div className={s.card__tests__item}>
          1. Сколько лет:{'  '}
          <span className={s.card__tests__item__answer}>
            {options.age}
            {'  '}лет
          </span>
        </div>
        <div className={s.card__tests__item}>
          2. Вы хотели бы получить план тренировок от тренера по:{'  '}
          <span className={s.card__tests__item__answer}>{options.plans}</span>
        </div>
        <div className={s.card__tests__item}>
          3. Есть ли у Вас диагностированные ранее перенесенные или хронические
          заболевания из списка ниже: Астма / {'  '}
          <span className={s.card__tests__item__answer}>{options.asthma}</span>,
          Диабет /{'  '}
          <span className={s.card__tests__item__answer}>
            {options.diabetes}
          </span>
          ,
        </div>
      </div>
      <div className={s.card__more__btn}>посмотреть всё</div>
    </div>
  );
};
