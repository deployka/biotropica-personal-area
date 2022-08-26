import React from 'react';
import Modal from '../../../shared/Global/Modal/Modal';
import {
  RecommendationEditForm,
  RecommendationForm,
} from '../EditForm/EditForm';

type Props = {
  isOpened: boolean;
  defaultValues: RecommendationForm;
  onSave: (data: RecommendationForm) => void;
  onClose: () => void;
};

export const EditModal = ({
  isOpened,
  defaultValues,
  onSave,
  onClose,
}: Props) => {
  return (
    <Modal isOpened={isOpened} close={onClose}>
      <RecommendationEditForm
        defaultValues={defaultValues}
        onSave={onSave}
        onClose={onClose}
      />
    </Modal>
  );
};
