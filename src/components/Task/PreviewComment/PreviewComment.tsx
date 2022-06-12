import React from 'react';
import { formatDate } from './PreviewCommentHelper';

import s from './PreviewComment.module.scss';
import { Comment } from '../../../@types/entities/Comment';
import { getMediaLink } from '../../../utils/mediaHelper';

export type TaskPreviewCommentProps = {
  comment: Comment;
};

export function TaskPreviewComment({ comment }: TaskPreviewCommentProps) {
  const { datetime, text, author } = comment;
  const { lastname, name, profilePhoto } = author;

  return (
    <div className={s.comment}>
      <div className={s.photo}>
        <img src={getMediaLink(profilePhoto || '')} alt="" />
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
