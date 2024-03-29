import React from 'react';
import moment from 'moment';
import { useModal } from '../../../../../hooks/useModal';
import { ModalName } from '../../../../../providers/ModalProvider';
import {
  Progress,
  ProgressPhoto,
} from '../../../../../@types/entities/Progress';

import s from './ProgressCard.module.scss';

interface Props {
  card: Progress;
}
interface CreatedAtProps {
  createdAt: Date;
}

export function CreatedAt({ createdAt }: CreatedAtProps) {
  return (
    <p>
      {moment(new Date(createdAt), 'YYYYMMDD').fromNow()},{' '}
      {moment(createdAt).format('Do MMMM YYYY г.')}
    </p>
  );
}

export const ProgressCard = ({ card }: Props) => {
  const { openModal } = useModal();

  const photos: ProgressPhoto[] = card.photos;

  const createdAtDate = new Date(card.createdAt);

  function onImgClick(i: number) {
    return () => {
      openModal(ModalName.MODAL_PROGRESS_PHOTO_SLIDER, {
        photos,
        createdAt: createdAtDate,
        i,
      });
    };
  }

  return (
    <div className={s.card}>
      <div className={s.imagesWrapper}>
        {card.photos.map((image: ProgressPhoto, i: number) => (
          <div key={image.filename} className={s.img}>
            <img
              onClick={onImgClick(i)}
              src={process.env.REACT_APP_BACKEND_URL + '/' + image.filename}
            />
          </div>
        ))}
      </div>
      <div className={s.date}>
        <CreatedAt createdAt={createdAtDate} />
      </div>
    </div>
  );
};
