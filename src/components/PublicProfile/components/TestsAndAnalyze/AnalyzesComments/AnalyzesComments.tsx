import React from 'react';
import { Comment } from '../../../../../store/ducks/analyze/contracts/state';
import { AnalyzesComment } from './AnalyzesComment';

import s from './AnalyzesComments.module.scss';

type Props = {
  comments: Comment[];
};

export function AnalyzesComments({ comments }: Props) {
  return (
    <div className={s.analyzesComments}>
      {comments.map(comment => (
        <AnalyzesComment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
