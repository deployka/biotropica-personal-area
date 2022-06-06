import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { AnalyzeAnswer } from '../../../../../store/ducks/analyze/contracts/state';
import { getMediaLink } from '../../../../../utils/mediaHelper';
import documentSvg from '../../../../../assets/icons/profile/document.svg';

import s from './AnalyzesCard.module.scss';
import { Comments } from '../../../../../components/Comments/Comments';
import { CommentsInfo } from '../../../../Comments/CommentsInfo';
import { AddCommentForm } from './AddCommentForm';
import { useSort } from './useSort';
import { Order } from '../../../../../@types/constants/Order';

interface Props {
  analyze: AnalyzeAnswer;
  onAddComment: (comment: string, analyzeId: number) => void;
  isLoadingComment: boolean;
  onDeleteComment: (id: number) => void;
}

export const Analyze = ({
  analyze,
  onAddComment,
  isLoadingComment,
  onDeleteComment,
}: Props) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const { setSort, sort } = useSort('DESC');

  const onSort = (by: Order) => setSort(by);

  const sortedComments = useMemo(
    () =>
      analyze.comments.slice().sort((a, b) => {
        if (sort === 'ASC') {
          return a.createdAt > b.createdAt ? 1 : -1;
        }
        return a.createdAt < b.createdAt ? 1 : -1;
      }),
    [sort, analyze.comments],
  );

  return (
    <div key={analyze.id} className={s.document}>
      <div className={s.content}>
        <div className={s.icon}>
          <img src={documentSvg} />
        </div>
        <div className={s.name}>
          <a
            target="_blank"
            href={getMediaLink(analyze.filePath)}
            rel="noreferrer"
          >
            {analyze.text}
          </a>
        </div>
      </div>
      <div className={s.analyze_footer}>
        <div className={s.createdAt}>
          {moment(analyze.createdAt).format('LL')}
        </div>

        {isCommentsOpen && (
          <AddCommentForm
            isLoading={isLoadingComment}
            onSubmit={onAddComment}
            analyzeId={analyze.id}
          />
        )}
        <CommentsInfo
          sort={sort}
          onSort={onSort}
          isOpen={isCommentsOpen}
          onToggle={() => setIsCommentsOpen(!isCommentsOpen)}
          length={analyze.comments.length}
        />
      </div>
      {isCommentsOpen && (
        <Comments
          withTrash={true}
          onDelete={onDeleteComment}
          comments={sortedComments}
        />
      )}
    </div>
  );
};
