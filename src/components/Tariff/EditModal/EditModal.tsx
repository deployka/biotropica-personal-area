import React from 'react';

import Modal from '../../../shared/Global/Modal/Modal';
import { Tariff } from '../../../@types/entities/Tariff';
import { TariffEditor } from '../Editor/Editor';
import {
  showErrorNotificationAfterDeleteTariff,
  showErrorNotificationAfterChangeTariff,
  showSuccessNotificationAfterDeleteTariff,
  showSuccessNotificationAfterChangeTariff,
} from '../../../utils/tariffHelper';

import s from './EditModal.module.scss';
import {
  useRequestChangeTariffMutation,
  useRequestDeleteTariffMutation,
} from '../../../api/tariffs';

interface Props {
  id: Tariff['id'];
  cost: Tariff['cost'];
  title: Tariff['title'];
  includedFields: Tariff['includedFields'];
  zakazSystemId: Tariff['zakazSystemId'];
  isVisible: boolean;
  onClose(): void;
  refetchTariffs(): void;
}

const EditTariffModal = (props: Props) => {
  const {
    id,
    title,
    cost,
    includedFields,
    zakazSystemId,
    isVisible,
    onClose,
    refetchTariffs,
  } = props;

  const [updateTariff, { isSuccess: isChangeSuccess, isError: isChangeError }] =
    useRequestChangeTariffMutation();
  const [deleteTariff, { isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useRequestDeleteTariffMutation();

  React.useEffect(() => {
    if (isChangeSuccess || isDeleteSuccess) {
      onClose();
      refetchTariffs();
    }

    isDeleteSuccess && showSuccessNotificationAfterDeleteTariff(title);
    isChangeSuccess && showSuccessNotificationAfterChangeTariff(title);
  }, [isChangeSuccess, isDeleteSuccess]);

  React.useEffect(() => {
    isChangeError && showErrorNotificationAfterChangeTariff(title);
    isDeleteError && showErrorNotificationAfterDeleteTariff(title);
  }, [isChangeError, isDeleteError]);

  const handleDeleteTariff = () => {
    deleteTariff({ id });
  };

  const handleSaveTariff = (updatedTariff: Tariff) => {
    updateTariff(updatedTariff);
  };

  return (
    <Modal isOpened={isVisible} close={() => onClose()} className={s.modal}>
      <TariffEditor
        id={id}
        title={title}
        zakazSystemId={zakazSystemId}
        cost={cost}
        includedFields={includedFields}
        onClose={() => onClose()}
        onRemove={() => handleDeleteTariff()}
        onSave={(updatedTariff: Tariff) => handleSaveTariff(updatedTariff)}
      />
    </Modal>
  );
};

export default EditTariffModal;
