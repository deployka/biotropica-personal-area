import React from 'react';
import Modal from '../../../shared/Global/Modal/Modal';
import { UnlockUser } from '../UnblockUser/UnblockUser';
import { BlockUserForm } from './../BlockUserModal/BlockUserForm';

type Props = {
  isOpened: boolean;
  type: 'block' | 'unblock' | null;
  onReject: () => void;
  onBlock: (banReason: string) => void;
  onUnblock: () => void;
};

export function BanStatusModal({
  isOpened,
  type,
  onReject,
  onBlock,
  onUnblock,
}: Props) {
  return (
    <Modal isOpened={isOpened} close={onReject}>
      {type === 'block' ? (
        <BlockUserForm onSubmit={onBlock} onCancel={onReject} />
      ) : (
        <UnlockUser onSubmit={onUnblock} onCancel={onReject} />
      )}
    </Modal>
  );
}
