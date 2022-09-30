import React from 'react';
import { Comment } from './Comment';
import { Comment as CommentType } from '../../@types/entities/Comment';

import s from './Comments.module.scss';
import { BaseUser } from '../../@types/entities/BaseUser';

type Props = {
  isClient: boolean;
  comments: CommentType[];
  onDelete?: (id: number) => void;
  withTrash?: boolean;
  currentUserId?: number;
};

export function Comments({
  comments = [],
  onDelete,
  currentUserId,
  isClient,
}: Props) {
  return (
    <div className={s.comments}>
      {!comments.length && <p>Нет комментариев</p>}
      {comments.map(comment => (
        <Comment
          withTrash={
            currentUserId === (comment.author as BaseUser)?.specialist?.id &&
            !isClient
          }
          specializations={
            (comment.author as BaseUser)?.specialist?.specializations || []
          }
          key={comment.id}
          id={comment.id}
          // TODO: пофиксить any
          specialistId={(comment.author as BaseUser)?.specialist?.id || 0}
          onDelete={onDelete}
          comment={comment}
        />
      ))}
    </div>
  );
}
