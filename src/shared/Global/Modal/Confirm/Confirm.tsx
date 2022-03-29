import React from 'react';

import s from './Confirm.module.scss';
import Modal from '../Modal';

interface IProps {
  helpMessage: string,
  accept: () => void,
  reject: () => void,
}

const ConfirmModal = (props: IProps) => {
  const {
    helpMessage,
    accept,
    reject,
  } = props;

  return (
    <div className={s.confirm}>
      <div className={s.helpMessage}>
        {helpMessage}
      </div>
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
