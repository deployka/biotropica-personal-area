import React from 'react';

import Modal from '../../../../shared/Global/Modal/Modal';
import { Tariff, NewTariff } from '../../../../types/entities/Tariff';
import { TariffEditor } from '../../../../components/Tariff/TariffEditor/TariffEditor';
import { useRequestAddTariffMutation } from '../../../../store/rtk/requests/tariffs';

interface Props {
	isVisible: boolean;
	onClose(): void;
}

const AddTariffModal = (props: Props) => {
	const {
		isVisible,
		onClose,
	} = props;

	const [addTariff] = useRequestAddTariffMutation();

	const handleAddTariff = (newTariff: NewTariff) => {
		addTariff(newTariff);
	};

	return (
		<Modal
			isOpened={isVisible}
			close={() => onClose()}
		>
			<TariffEditor 
				isNew
				onClose={() => onClose()}
				onSave={newTariff => handleAddTariff(newTariff)}
			/>
		</Modal>
	);
};

export default AddTariffModal;
