import React from 'react';
import { formatDate } from './PreviewCommentHelper';

import s from './PreviewComment.module.scss';

export type TaskPreviewCommentProps = {
  comment: TaskComment;
};

export function TaskPreviewComment({ comment }: TaskPreviewCommentProps) {
  const { datetime, text, author } = comment;
  // eslint-disable-next-line camelcase
  const { lastname, name, profilePhoto } = author;

  return (
    <div className={s.comment}>
      <div className={s.photo}>
        {/* eslint-disable-next-line camelcase */}
        <img src={profilePhoto} alt="" />
      </div>
      <div className={s.body}>
        <div className={s.header}>
          <div className={s.name}>
            {name} {lastname}
          </div>
          <div className={s.date}>{formatDate(datetime)}</div>
        </div>
        <p className={s.text}>{text}</p>
      </div>
    </div>
  );
}
