import React from 'react';

import {
  useRequestChangeTariffMutation,
  useRequestDeleteTariffMutation,
} from '../../../../store/rtk/requests/tariffs';
import Modal from '../../../../shared/Global/Modal/Modal';
import { Tariff } from '../../../../types/entities/Tariff';
import { TariffEditor } from '../../../../components/Tariff/TariffEditor/TariffEditor';
import {
  showErrorNotificationAfterDeleteTariff,
  showErrorNotificationAfterChangeTariff,
  showSuccessNotificationAfterDeleteTariff,
  showSuccessNotificationAfterChangeTariff,
} from '../../../../utils/tariffHelper';

import s from './EditTariffModal.module.scss';

interface Props {
	id: Tariff['id'];
	cost: Tariff['cost'];
	title: Tariff['title'];
	includedFields: Tariff['includedFields'];
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
    isVisible,
    onClose,
    refetchTariffs,
  } = props;

  const [updateTariff, { isSuccess: isChangeSuccess, isError: isChangeError }] = useRequestChangeTariffMutation();
  const [deleteTariff, { isSuccess: isDeleteSuccess, isError: isDeleteError }] = useRequestDeleteTariffMutation();

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
		<Modal
			isOpened={isVisible}
			close={() => onClose()}
			className={s.modal}
		>
			<TariffEditor
				id={id}
				title={title}
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
