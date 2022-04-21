import React, { Dispatch, SetStateAction } from 'react';
import s from './BtnClose.module.scss';

import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const BtnClose = ({ setOpen }: Props) => {
  return (
    <div onClick={() => setOpen(false)} className={s.BtnClose}>
      <GlobalSvgSelector id="close-cross" />
    </div>
  );
};
