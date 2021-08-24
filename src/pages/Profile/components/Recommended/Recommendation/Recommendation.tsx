import s from './Recommendation.module.scss';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
interface Props {
  options: any;
}

export const Recommendation = ({ options }: Props) => {
  return (
    <div className={s.recommendation}>
      <div className={s.recommended__card__content}>
        <div className={s.card__header}>
          <div className={s.profile__avatar__wrapper}>
            <img src={options.avatar} className={s.profile__avatar}></img>
          </div>
          <div className={s.profile__info}>
            <div className={s.profile__name}>{options.name}</div>
            <div className={s.profile__post}>{options.post}</div>
          </div>
          <a href={options.profileLink} className={s.profile__btn__wrapper}>
            <button className={s.profile__btn}>перейти в профиль</button>
          </a>
        </div>
        <PerfectScrollbar>
          <div className={s.card__post}>
            <h3 className={s.post__title}>
              Рекомендации, рацион правильного питания и самые полезные продукты
              без глютена
            </h3>
            <p className={s.post__text}>
              О том, что для поддержания здоровья необходимо правильное питание
              (пп питание), сегодня много говорят и пишут. Здоровое питание
              позволяет обеспечить организм необходимыми питательными
              веществами, витаминами, микроэлементами, биологически активными
              веществами, что необходимо для продуктивной работы вашего тела.
              Правильно подобранный рацион питания позволит вам быть энергичным,
              полным сил.
            </p>
            <h4 className={s.post__subtitle}>
              Рекомендации по правильному здоровому питанию
            </h4>
            <p className={s.post__text}>
              В первую очередь пп рацион должен включать необходимое количество
              жидкости — 2,5-3 литра в день. Предпочтительно это должна быть
              вода и другие безалкогольные напитки с низким содержанием калорий
              и сахара (чай, кофе). Правильное питание для здоровья невозможно
              без достаточного количества овощей (не менее 400 гр. на 2-3 или
              больше порций в день) Свежие овощи, включая не разогретые сырые
              овощи, являются важным источником витаминов, минеральных веществ,
              вторичных растительных веществ и клетчатки. Рекомендуется
              употреблять 2-3 яйца в день. Яйца являются отличным источником
              белка и омега-3-жирных кислот (если куры пасутся на лугу), а также
              холина, рекомендуется употреблять 2-3 яйца в день. Если у вас
              здоровое питание меню должно включать фрукты (не менее 300 г в
              день) Свежие фрукты, а также сухофрукты, являются великолепным
              источником многих витаминов, минеральных веществ, вторичных
              растительных веществ и клетчатки.
            </p>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};
