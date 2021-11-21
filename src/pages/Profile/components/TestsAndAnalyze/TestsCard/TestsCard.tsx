import s from './TestsCard.module.scss';

import editSvg from '../../../../../assets/icons/profile/edit.svg';

interface Props {
  tests: any;
}

export const TestsCard = ({ tests }: Props) => {
  return (
    <div className={s.testCard}>
      <div className={s.header}>
        <div className={s.title}>
          <p>Тестирование</p>
        </div>
        <div className={s.updateBtn}>
          <a href={tests.updateUrl}>
            <p className={s.text}>редактировать</p>
            <div className={s.icon}>
              <img src={editSvg} alt="" />
            </div>
          </a>
        </div>
      </div>
      <div className={s.list}>
        <div className={s.item}>
          <p>
            1. Сколько лет: <span className={s.answer}>{tests.age} лет</span>
          </p>
        </div>
        <div className={s.item}>
          <p>
            2. Вы хотели бы получить план тренировок от тренера по:{'  '}
            <span className={s.answer}>{tests.plans}</span>
          </p>
        </div>
        <div className={s.item}>
          <p>
            3. Есть ли у Вас диагностированные ранее перенесенные или
            хронические заболевания из списка ниже: Астма / {'  '}
            <span className={s.answer}>{tests.asthma}</span>, Диабет /{'  '}
            <span className={s.answer}>{tests.diabetes}</span>
          </p>
        </div>
      </div>
      <div className={s.moreBtn}>
        <a>посмотреть всё</a>
      </div>
    </div>
  );
};
