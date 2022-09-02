import React from 'react';
import moment from 'moment';

import type { Progress } from '../../../@types/entities/Progress';

import s from './ProgressPost.module.scss';

interface Props {
  post: Progress;
  onClickPhoto: (post: Progress, index: number) => void;
  onDelete: () => void;
}

export const ProgressPost = ({ post, onClickPhoto, onDelete }: Props) => {
  const { photos, createdAt } = post;

  const fromNow = moment(new Date(createdAt), 'YYYYMMDD').fromNow();
  const formattedDate = moment(createdAt).format('Do MMMM YYYY г.');

  return (
    <div className={s.card}>
      <div className={s.imagesWrapper}>
        {photos.map((image, i: number) => (
          <div key={image.filename} className={s.img}>
            <img
              onClick={() => onClickPhoto(post, i)}
              src={process.env.REACT_APP_BACKEND_URL + '/' + image.filename}
            />
          </div>
        ))}
      </div>
      <div className={s.date}>
        <p>
          {fromNow}, {formattedDate}
        </p>
        <p className={s.delete} onClick={onDelete}>
          Удалить запись
        </p>
      </div>
    </div>
  );
};
