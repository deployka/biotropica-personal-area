import React, { useState } from 'react';
import moment from 'moment';
import { getMediaLink } from '../../../../../utils/mediaHelper';
import documentSvg from '../../../../../assets/icons/profile/document.svg';
import { Comments } from '../../../../../components/Comments/Comments';
import { CommentsInfo } from '../../../../../components/Comments/CommentsInfo';
import { AnalyzeAnswer } from '../../../../../@types/entities/AnalyzeAnswer';

import s from './Analyze.module.scss';
interface Props {
  analyze: AnalyzeAnswer;
}

export const Analyze = ({ analyze }: Props) => {
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
            <img src={documentSvg} />
          </div>
          <span className={s.text}>{analyze.text}</span>
        </a>
        <p className={s.createdAt}>{moment(analyze.createdAt).format('LL')}</p>
      </div>

      <div className={s.footer}>
        <CommentsInfo
          isOpen={isCommentsOpen}
          onToggle={() => setIsCommentsOpen(!isCommentsOpen)}
          length={analyze.comments.length}
        />
      </div>
      {isCommentsOpen && <Comments comments={analyze.comments} />}
    </div>
  );
};
