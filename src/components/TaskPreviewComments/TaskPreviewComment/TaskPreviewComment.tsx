import React from 'react';
import s from './TaskPreviewComment.module.scss';
import { formatDate } from './TaskPreviewCommentHelper';

export type TaskPreviewCommentProps = {
  comment: TaskComment;
};

export function TaskPreviewComment({ comment }: TaskPreviewCommentProps) {
  const { datetime, text, author } = comment;
  // eslint-disable-next-line camelcase
  const { lastname, name, profile_photo } = author;

  return (
    <div className={s.comment}>
      <div className={s.photo}>
        {/* eslint-disable-next-line camelcase */}
        <img src={profile_photo} alt="" />
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
