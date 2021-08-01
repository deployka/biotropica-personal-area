import s from './BtnClose.module.scss';
import close from '../../../assets/icons/close-cross.svg';

export const BtnClose = () => {
  return (
    <div className={s.btn__close}>
      <img src={close} className={s.btn__close__img}></img>
    </div>
  );
};
