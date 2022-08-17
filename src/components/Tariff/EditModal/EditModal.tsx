import React from 'react';
import Modal from '../../../shared/Global/Modal/Modal';
import { Tariff } from '../../../@types/entities/Tariff';

import s from './EditModal.module.scss';
import { CreateTariffDto } from '../../../@types/dto/tariffs/create.dto';
import { UpdateTariffDto } from '../../../@types/dto/tariffs/update.dto';
import { TariffEditForm } from '../EditForm/EditForm';
import { TariffAddForm } from '../AddForm/AddForm';

interface Props {
  mode: 'create' | 'edit';
  tariff: Tariff | null;
  isOpened: boolean;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (data: UpdateTariffDto) => void;
  onCreate: (data: CreateTariffDto) => void;
}

export const EditTariffModal = ({
  tariff,
  mode,
  isOpened,
  onClose,
  onUpdate,
  onDelete,
  onCreate,
}: Props) => {
  return (
    <Modal isOpened={isOpened} close={onClose} className={s.modal}>
      {mode === 'edit' && tariff ? (
        <TariffEditForm
          tariff={tariff}
          onClose={onClose}
          onDelete={onDelete}
          onSubmit={onUpdate}
        />
      ) : (
        <TariffAddForm onClose={onClose} onSubmit={onCreate} />
      )}
    </Modal>
  );
};
