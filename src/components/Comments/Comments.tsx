import React from 'react';
import { Comment } from './Comment';
import { Comment as CommentType } from '../../@types/entities/Comment';

import s from './Comments.module.scss';
import { BaseUser } from '../../@types/entities/BaseUser';

type Props = {
  comments: CommentType[];
  onDelete?: (id: number) => void;
  withTrash?: boolean;
  currentUserId?: number;
};

export function Comments({ comments = [], onDelete, currentUserId }: Props) {
  return (
    <div className={s.comments}>
      {!comments.length && <p>Нет комментариев</p>}
      {comments.map(comment => (
        <Comment
          withTrash={currentUserId === (comment.author as BaseUser)?.id}
          key={comment.id}
          id={comment.id}
          currentUserId={currentUserId}
          author={comment.author as BaseUser}
          onDelete={onDelete}
          comment={comment}
        />
      ))}
    </div>
  );
}
