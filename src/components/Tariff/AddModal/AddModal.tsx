import React from 'react';

import {
  showErrorNotificationAfterAddTariff,
  showSuccessNotificationAfterAddTariff,
} from '../../../utils/tariffHelper';
import Modal from '../../../shared/Global/Modal/Modal';
import { NewTariff } from '../../../@types/entities/Tariff';
import { TariffEditor } from '../Editor/Editor';
import { useRequestAddTariffMutation } from '../../../api/tariffs';

interface Props {
  isVisible: boolean;
  onClose(): void;
  refetchTariffs(): void;
}

export const TariffAddModal = (props: Props) => {
  const { isVisible, onClose, refetchTariffs } = props;

  const [addTariff, { isSuccess, isError }] = useRequestAddTariffMutation();

  React.useEffect(() => {
    if (isSuccess) {
      onClose();
      refetchTariffs();
    }

    isSuccess && showSuccessNotificationAfterAddTariff();
    isError && showErrorNotificationAfterAddTariff();
  }, [isSuccess, isError]);

  const handleAddTariff = (
    newTariff: Omit<NewTariff, 'createdAt' | 'updatedAt'>,
  ) => {
    addTariff(newTariff);
  };

  return (
    <Modal isOpened={isVisible} close={() => onClose()}>
      <TariffEditor
        isNew
        onClose={() => onClose()}
        onSave={newTariff => handleAddTariff(newTariff)}
      />
    </Modal>
  );
};
