import React from 'react';
import type { CreateRecommendationDto } from '../../../@types/dto/recommendations/create.dto';
import type { UpdateRecommendationDto } from '../../../@types/dto/recommendations/update.dto';
import Modal from '../../../shared/Global/Modal/Modal';
import {
  RecommendationEditForm,
  RecommendationForm,
} from '../EditForm/EditForm';

type Props = {
  isOpened: boolean;
  recommendation: UpdateRecommendationDto | null;
  onCreate: (data: RecommendationForm) => void;
  onEdit: (data: RecommendationForm) => void;
  onClose: () => void;
};

export const EditModal = ({
  isOpened,
  recommendation,
  onCreate,
  onEdit,
  onClose,
}: Props) => {
  const handleSubmit = (data: RecommendationForm) => {
    if (!recommendation) return;
    if (recommendation.id) {
      return onEdit(data);
    }
    onCreate(data);
  };

  return (
    <Modal isOpened={isOpened} close={onClose}>
      <RecommendationEditForm
        defaultValues={{
          title: recommendation?.title || '',
          description: recommendation?.description || '',
        }}
        onSave={handleSubmit}
        onClose={onClose}
      />
    </Modal>
  );
};
