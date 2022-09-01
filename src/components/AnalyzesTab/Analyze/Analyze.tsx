import React, { useState } from 'react';
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

interface Props {
  isEditable: boolean;
  analyze: AnalyzeAnswer;
  onDelete: () => void;
}

export const AnalyzesAnalyze = ({ isEditable, analyze, onDelete }: Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const actions: Action[] = [
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
        {isEditable && (
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
        {analyze.comments.length === 0 ? (
          <p className={s.noComments}>Нет комментариев</p>
        ) : (
          <CommentsInfo
            isOpen={isCommentsOpen}
            onToggle={() => setIsCommentsOpen(!isCommentsOpen)}
            length={analyze.comments.length}
          />
        )}
      </div>
      {isCommentsOpen && (
        <Comments comments={analyze.comments} isClient={true} />
      )}
    </div>
  );
};
