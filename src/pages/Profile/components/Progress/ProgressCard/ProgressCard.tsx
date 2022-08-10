import React from 'react';
import moment from 'moment';
import { useModal } from '../../../../../hooks/useModal';
import { ModalName } from '../../../../../providers/ModalProvider';
import s from './ProgressCard.module.scss';
import {
  Progress,
  ProgressPhoto,
} from '../../../../../@types/entities/Progress';

interface Props {
  card: Progress;
  onDelete: () => void;
}

export const ProgressCard = ({ card, onDelete }: Props) => {
  const { openModal } = useModal();

  const photos: ProgressPhoto[] = card.photos;

  return (
    <div className={s.card}>
      <div className={s.imagesWrapper}>
        {card.photos.map((image: ProgressPhoto, i: number) => (
          <div key={image.filename} className={s.img}>
            <img
              onClick={() =>
                openModal(ModalName.MODAL_PROGRESS_PHOTO_SLIDER, {
                  photos,
                  createdAt: new Date(card.createdAt),
                  i,
                })
              }
              src={process.env.REACT_APP_BACKEND_URL + '/' + image.filename}
            />
          </div>
        ))}
      </div>
      <div className={s.date}>
        <p>
          {moment(new Date(card.createdAt), 'YYYYMMDD').fromNow()},{' '}
          {moment(card.createdAt).format('Do MMMM YYYY г.')}
        </p>
        <p className={s.delete} onClick={onDelete}>
          Удалить запись
        </p>
      </div>
    </div>
  );
};
