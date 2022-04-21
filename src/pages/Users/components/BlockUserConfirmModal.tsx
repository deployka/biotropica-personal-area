import React from 'react';
import ConfirmModal from '../../../shared/Global/Modal/Confirm/Confirm';
import Modal from '../../../shared/Global/Modal/Modal';

type Props = {
    opened: boolean;
    onDisagreed: () => void;
    onAgreed: () => void;
}

export function BlockUserConfirmModal(props: Props) {
  const buttons = [
    {
      title: 'Нет',
      key: 'no',
    },
    {
      title: 'Да',
      key: 'yes',
      primary: true,
    },
  ];

  function onBtnClick(key: string) {
    if (key === 'yes') {
      return props.onAgreed();
    }
    return props.onDisagreed();
  }

  // return <div></div>

  // return <Modal
  //     opened={true}
  //     onClose={() => {}}>
  //     sdfa
  // </Modal>
  //
  return <Modal isOpened={props.opened} close={props.onDisagreed}>
    <ConfirmModal
      helpMessage={'Вы уверены, что хотите заблокировать пользователя?'}
      accept={props.onAgreed}
      reject={props.onDisagreed}
    />
  </Modal>;
}
