import React from 'react';
import { Comment } from './Comment';
import { Comment as CommentType } from '../../@types/entities/Comment';

import s from './Comments.module.scss';

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
            currentUserId === (comment.author as any).specialist.id && !isClient
          }
          key={comment.id}
          id={comment.id}
          // TODO: пофиксить any
          specialistId={(comment.author as any).specialist.id}
          onDelete={onDelete}
          comment={comment}
        />
      ))}
    </div>
  );
}
