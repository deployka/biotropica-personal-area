import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import s from './BtnBack.module.scss';

export const BtnBack = () => {
  return (
    <div className={s.btn__back}>
      <svg className={s.btn__back__img}>
        <GlobalSvgSelector id="previous" />
      </svg>
    </div>
  );
};
