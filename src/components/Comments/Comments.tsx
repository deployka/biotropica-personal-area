import React from 'react';
import { Comment } from './Comment';
import { Comment as CommentType } from '../../@types/entities/Comment';

import s from './Comments.module.scss';

type Props = {
  comments: CommentType[];
  onDelete?: (id: number) => void;
  withTrash?: boolean;
};

export function Comments({ comments = [], onDelete, withTrash }: Props) {
  return (
    <div className={s.comments}>
      {!comments.length && <p>Нет комментариев</p>}
      {comments.map(comment => (
        <Comment
          withTrash={withTrash}
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
