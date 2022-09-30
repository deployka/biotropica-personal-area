import React from 'react';
import ConfirmModal from '../../../shared/Global/Modal/Confirm/Confirm';
import Modal from '../../../shared/Global/Modal/Modal';

type Props = {
  isOpened: boolean;
  onAccept: () => void;
  onClose: () => void;
};

export const SpecialistConsultationsDeleteModal = ({
  isOpened,
  onAccept,
  onClose,
}: Props) => {
  return (
    <Modal isOpened={isOpened} close={onClose}>
      <ConfirmModal accept={onAccept} reject={onClose}>
        Вы уверены, что хотите удалить консультацию?
      </ConfirmModal>
    </Modal>
  );
};
