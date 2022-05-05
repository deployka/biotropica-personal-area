import React from 'react';

import {
  useRequestChangeTariffMutation,
  useRequestDeleteTariffMutation,
} from '../../../../store/rtk/requests/tariffs';
import Modal from '../../../../shared/Global/Modal/Modal';
import { Tariff, NewTariff } from '../../../../types/entities/Tariff';
import { TariffEditor } from '../../../../components/Tariff/TariffEditor/TariffEditor';

import s from './EditTariffModal.module.scss';

interface Props {
	id: Tariff['id'];
	title: Tariff['title'];
	cost: Tariff['cost'];
	includedFields: Tariff['includedFields'];
	isVisible: boolean;
	onClose(): void;
}

const EditTariffModal = (props: Props) => {
  const {
    id,
    title,
    cost,
    includedFields,
    isVisible,
    onClose,
  } = props;

  const [updateTariff] = useRequestChangeTariffMutation();
  const [deleteTariff] = useRequestDeleteTariffMutation();

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
