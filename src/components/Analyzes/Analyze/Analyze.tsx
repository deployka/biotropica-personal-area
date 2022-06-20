import React, { useState } from 'react';
import moment from 'moment';
import { getMediaLink } from '../../../utils/mediaHelper';
import { Comments } from '../../../components/Comments/Comments';
import { CommentsInfo } from '../../../components/Comments/CommentsInfo';
import { AnalyzeAnswer } from '../../../@types/entities/AnalyzeAnswer';
import dotsIcon from './../../../assets/icons/dotsGrey.svg';
import { ProfileSvgSelector } from '../../../assets/icons/profile/ProfileSvgSelector';
import { AnalyzePopup } from './AnalyzePopup';

import s from './Analyze.module.scss';

interface Props {
  analyze: AnalyzeAnswer;
  onDelete: () => void;
}

export const AnalyzesAnalyze = ({ analyze, onDelete }: Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

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
        <div
          className={s.actions}
          onClick={() => {
            setIsPopupOpen(true);
          }}
        >
          <img src={dotsIcon} />
        </div>
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
      {isPopupOpen && (
        <>
          <AnalyzePopup
            onDelete={() => {
              onDelete();
              setIsPopupOpen(false);
            }}
          />
          <div
            className={s.background}
            onClick={() => setIsPopupOpen(false)}
          ></div>
        </>
      )}
    </div>
  );
};
