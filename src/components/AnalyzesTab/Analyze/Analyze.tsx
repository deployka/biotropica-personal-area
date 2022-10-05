import React, { useMemo, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import dotsIcon from './../../../assets/icons/dotsGrey.svg';
import { getMediaLink } from '../../../utils/mediaHelper';
import { Comments } from '../../Comments/Comments';
import { CommentsInfo } from '../../Comments/CommentsInfo';
import { AnalyzeAnswer } from '../../../@types/entities/AnalyzeAnswer';
import { ProfileSvgSelector } from '../../../assets/icons/profile/ProfileSvgSelector';
import { Action, ActionMenu } from '../../UI/ActionsMenu/ActionsMenu';

import s from './Analyze.module.scss';
import { useSort } from '../../../hooks/useSort';
import { Order } from '../../../@types/constants/Order';
import { AddCommentForm } from '../../PublicProfile/components/TestsAndAnalyze/AnalyzesCard/AddCommentForm';
import { sortCommentsByDate } from '../helper';

interface Props {
  isEditable: boolean;
  analyze: AnalyzeAnswer;
  currentUserId: number;
  isLoadingComment?: boolean;
  onDelete?: () => void;
  onAddComment: (comment: string, analyzeId: number) => void;
  onDeleteComment: (id: number) => void;
}

export const AnalyzesAnalyze = ({
  isEditable,
  analyze,
  currentUserId,
  isLoadingComment = false,
  onDelete,
  onAddComment,
  onDeleteComment,
}: Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const { setSort, sort } = useSort('DESC');

  const onSort = (by: Order) => setSort(by);

  const sortedComments = useMemo(
    () => sortCommentsByDate(analyze.comments, sort),
    [sort, analyze.comments],
  );

  const actions: Action[] | undefined = onDelete && [
    {
      title: 'Удалить',
      onClick: onDelete,
      type: 'red',
    },
  ];

  return (
    <div key={analyze.id} className={s.analyze}>
      <div className={s.file}>
        <a
          target="_blank"
          className={s.fileLink}
          href={getMediaLink(analyze.filePath)}
          rel="noreferrer"
        >
          <div className={s.icon}>
            <ProfileSvgSelector id="document" />
          </div>
          <p className={s.text}>{analyze.text}</p>
        </a>

        <p className={s.createdAt}>{moment(analyze.createdAt).format('LL')}</p>
        {isEditable && actions && (
          <ActionMenu
            isOpened={isPopupOpen}
            actions={actions}
            onClose={() => setIsPopupOpen(false)}
            className={s.actionsWrapper}
            position={{
              top: 15,
              right: 10,
            }}
          >
            <div
              className={classNames(s.actions, { [s.active]: isPopupOpen })}
              onClick={() => {
                setIsPopupOpen(!isPopupOpen);
              }}
            >
              <img src={dotsIcon} />
            </div>
          </ActionMenu>
        )}
      </div>

      <div className={s.footer}>
        {isCommentsOpen && (
          <AddCommentForm
            isLoading={isLoadingComment}
            onSubmit={onAddComment}
            analyzeId={analyze.id}
          />
        )}
        {analyze.comments.length === 0 && (
          <p
            className={s.noComments}
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          >
            Создать комментарий
          </p>
        )}
        {analyze.comments.length !== 0 && (
          <CommentsInfo
            sort={sort}
            onSort={onSort}
            isOpen={isCommentsOpen}
            onToggle={() => setIsCommentsOpen(!isCommentsOpen)}
            length={analyze.comments.length}
          />
        )}
      </div>
      {isCommentsOpen && (
        <Comments
          currentUserId={currentUserId}
          onDelete={onDeleteComment}
          comments={sortedComments}
        />
      )}
    </div>
  );
};
