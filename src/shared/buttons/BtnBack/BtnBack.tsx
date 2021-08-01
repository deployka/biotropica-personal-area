import s from './BtnBack.module.scss';
import sprite from '../../../assets/icons/sprite.svg';

export const BtnBack = () => {
  return (
    <div className={s.btn__back}>
      <svg className={s.btn__back__img}>
        <use href={sprite + '#previous'}></use>
      </svg>
    </div>
  );
};
