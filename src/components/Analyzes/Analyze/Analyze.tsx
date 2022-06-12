import React, { useState } from 'react';
import moment from 'moment';
import { getMediaLink } from '../../../utils/mediaHelper';
import documentSvg from '../../../assets/icons/profile/document.svg';
import { Comments } from '../../../components/Comments/Comments';
import { CommentsInfo } from '../../../components/Comments/CommentsInfo';
import { AnalyzeAnswer } from '../../../@types/entities/AnalyzeAnswer';

import s from './Analyze.module.scss';
interface Props {
  analyze: AnalyzeAnswer;
}

export const AnalyzesAnalyze = ({ analyze }: Props) => {
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9085 2.75C15.9085 2.75 8.23149 2.754 8.21949 2.754C5.45949 2.771 3.75049 4.587 3.75049 7.357V16.553C3.75049 19.337 5.47249 21.16 8.25649 21.16C8.25649 21.16 15.9325 21.157 15.9455 21.157C18.7055 21.14 20.4155 19.323 20.4155 16.553V7.357C20.4155 4.573 18.6925 2.75 15.9085 2.75Z"
                fill="white"
                stroke="#9E97BE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.7161 16.2236H8.49609H15.7161Z"
                fill="white"
              />
              <path
                d="M15.7161 16.2236H8.49609"
                stroke="#9E97BE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.7161 12.0371H8.49609H15.7161Z"
                fill="white"
              />
              <path
                d="M15.7161 12.0371H8.49609"
                stroke="#9E97BE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2511 7.86035H8.49609H11.2511Z"
                fill="white"
              />
              <path
                d="M11.2511 7.86035H8.49609"
                stroke="#9E97BE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className={s.text}>{analyze.text}</p>
        </a>
        <p className={s.createdAt}>{moment(analyze.createdAt).format('LL')}</p>
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
      {isCommentsOpen && <Comments comments={analyze.comments} />}
    </div>
  );
};
