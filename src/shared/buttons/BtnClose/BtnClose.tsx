import s from './BtnClose.module.scss';
import { Dispatch, SetStateAction } from 'react';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const BtnClose = ({ setOpen }: Props) => {
  return (
    <div onClick={() => setOpen(false)} className={s.btn__close}>
      <div className={s.btn__close__img}>
        <GlobalSvgSelector id="close-cross" />
      </div>
    </div>
  );
};
