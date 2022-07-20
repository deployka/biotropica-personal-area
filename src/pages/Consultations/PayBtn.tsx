import React from 'react';
import payImg from '../../assets/icons/transaction.svg';
import s from './Consultations.module.scss';

type Props = {
  onPayClick: () => void;
};

export function PayBtn({ onPayClick }: Props) {
  return (
    <img
      className={s.payImg}
      style={{ cursor: 'pointer' }}
      onClick={onPayClick}
      title="Оплатить консультацию"
      src={payImg}
    />
  );
}
