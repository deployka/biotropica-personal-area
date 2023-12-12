import React from 'react';
import { formatDate } from './PreviewCommentHelper';

import s from './PreviewComment.module.scss';
import { Comment } from '../../../@types/entities/Comment';
import { getMediaLink } from '../../../utils/mediaHelper';
import defaultAvatar from '../../../assets/images/profile/default_avatar.png';
import iconDelComment from '../../../assets/icons/remove-task.png';
import { parseLinkInText } from '../../../helpers/parseLinkInText';

export type TaskPreviewCommentProps = {
  comment: Comment;
  onDeleteComment(commentId: string): void;
};

export function TaskPreviewComment({
  comment,
  onDeleteComment,
}: TaskPreviewCommentProps) {
  const { datetime, text, author } = comment;
  const { lastname, name, profilePhoto } = author;

  return (
    <div className={s.comment}>
      <div className={s.photo}>
        <img
          src={profilePhoto ? getMediaLink(profilePhoto) : defaultAvatar}
          alt=""
        />
      </div>
      <div className={s.body}>
        <div className={s.header}>
          <div className={s.name}>
            {name} {lastname}
          </div>
          <div className={s.date}>{formatDate(datetime)}</div>
          <div style={{}}>
            <img
              src={iconDelComment}
              onClick={() => onDeleteComment(comment.uuid)}
              width="15px"
              height="15px"
              alt=""
            />
          </div>
        </div>
        <p
          className={s.text}
          dangerouslySetInnerHTML={{ __html: parseLinkInText(text, true) }}
        ></p>
      </div>
    </div>
  );
}
