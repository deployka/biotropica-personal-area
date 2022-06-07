import React, { useState } from 'react';
import moment from 'moment';
import { getMediaLink } from '../../../../../utils/mediaHelper';
import documentSvg from '../../../../../assets/icons/profile/document.svg';

import s from './AnalyzesCard.module.scss';
import { Comments } from '../../../../../components/Comments/Comments';
import { CommentsInfo } from '../../../../../components/Comments/CommentsInfo';
import { AnalyzeAnswer } from '../../../../../@types/entities/AnalyzeAnswer';

interface Props {
  analyze: AnalyzeAnswer;
}

export const Analyze = ({ analyze }: Props) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

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
