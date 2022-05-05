import React from 'react';

import { 
	showErrorNotificationAfterAddTariff,
	showSuccessNotificationAfterAddTariff,
} from '../../../../utils/tariffHelper';
import Modal from '../../../../shared/Global/Modal/Modal';
import { NewTariff } from '../../../../types/entities/Tariff';
import { useRequestAddTariffMutation } from '../../../../store/rtk/requests/tariffs';
import { TariffEditor } from '../../../../components/Tariff/TariffEditor/TariffEditor';

interface Props {
	isVisible: boolean;
	onClose(): void;
	refetchTariffs(): void;
}

const AddTariffModal = (props: Props) => {
  const {
    isVisible,
    onClose,
    refetchTariffs,
  } = props;

  const [addTariff, { isSuccess, isError }] = useRequestAddTariffMutation();

  React.useEffect(() => {

    if (isSuccess) {
      onClose();
      refetchTariffs();
    }

		isSuccess && showSuccessNotificationAfterAddTariff();
    isError && showErrorNotificationAfterAddTariff();

  }, [isSuccess, isError]);

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
