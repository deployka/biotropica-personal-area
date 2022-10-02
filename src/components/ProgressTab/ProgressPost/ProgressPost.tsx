import React from 'react';
import moment from 'moment';

import type { Progress } from '../../../@types/entities/Progress';

import s from './ProgressPost.module.scss';

interface Props {
  post: Progress;
  isDeletable?: boolean;
  onClickPhoto: (post: Progress, index: number) => void;
  onDelete?: () => void;
}

export const ProgressPost = ({
  post,
  isDeletable,
  onClickPhoto,
  onDelete,
}: Props) => {
  const { photos, createdAt } = post;

  const reversPhotos = [...photos].reverse();

  const fromNow = moment(new Date(createdAt), 'YYYYMMDD').fromNow();
  const formattedDate = moment(createdAt).format('Do MMMM YYYY г.');

  return (
    <div className={s.card}>
      <div className={s.imagesWrapper}>
        {reversPhotos.map((image, i: number) => (
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
        {isDeletable && (
          <p className={s.delete} onClick={onDelete}>
            Удалить запись
          </p>
        )}
      </div>
    </div>
  );
};
