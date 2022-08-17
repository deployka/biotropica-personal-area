import React, { ReactNode } from 'react';

import s from './Confirm.module.scss';
import Modal from '../Modal';

interface IProps {
  children?: ReactNode;
  accept: () => void;
  reject: () => void;
}

const ConfirmModal = ({ children, accept, reject }: IProps) => {
  return (
    <div className={s.confirm}>
      <div className={s.helpMessage}>{children}</div>
      <div className={s.controlBtns}>
        <button className={s.rejectBtn} onClick={() => reject()}>
          Нет
        </button>
        <button className={s.acceptBtn} onClick={() => accept()}>
          Да
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
