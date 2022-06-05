import React from 'react';

import s from './AdminHeader.module.scss';

import PlusIcon from '../../../assets/icons/plus.svg';
import Button from '../../Button/Button';

type Props = {
  onClick: () => void;
};

export const TariffAdminHeader = ({ onClick }: Props) => {
  return (
    <div className={s.header}>
      <Button isPrimary className={s.addBtn} onClick={onClick}>
        <img className={s.plusForAddBtn} src={PlusIcon} />
        <span>Добавить новый тариф</span>
      </Button>
    </div>
  );
};
