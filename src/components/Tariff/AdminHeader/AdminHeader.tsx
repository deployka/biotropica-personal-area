import React from 'react';
import PlusIcon from '../../../assets/icons/plus.svg';
import Button from '../../Button/Button';

import s from './AdminHeader.module.scss';

type Props = {
  isOrderEdit: boolean;
  onAddTariff: () => void;
  onEditOrder: () => void;
  onCancelEditOrder: () => void;
  onSaveOrder: () => void;
};

export const TariffAdminHeader = ({
  isOrderEdit,
  onAddTariff,
  onEditOrder,
  onCancelEditOrder,
  onSaveOrder,
}: Props) => {
  return (
    <div className={s.header}>
      {!isOrderEdit && (
        <>
          <Button isPrimary className={s.addBtn} onClick={onAddTariff}>
            <img className={s.plusForAddBtn} src={PlusIcon} />
            <span>Добавить новый тариф</span>
          </Button>
          <Button className={s.addBtn} onClick={onEditOrder}>
            <span>Редактировать порядок</span>
          </Button>
        </>
      )}
      {isOrderEdit && (
        <>
          <Button
            css={{ color: '#d06361' }}
            className={s.addBtn}
            onClick={onCancelEditOrder}
          >
            <span>Отменить</span>
          </Button>
          <Button isPrimary className={s.addBtn} onClick={onSaveOrder}>
            <span>Сохранить</span>
          </Button>
        </>
      )}
    </div>
  );
};
