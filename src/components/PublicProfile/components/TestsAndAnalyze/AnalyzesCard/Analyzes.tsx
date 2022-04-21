import React, { useState } from 'react';
import moment from 'moment';
import { AnalyzeAnswer } from '../../../../../store/ducks/analyze/contracts/state';
import { getMediaLink } from '../../../../../utils/mediaHelper';
import documentSvg from '../../../../../assets/icons/profile/document.svg';
import { AnalyzesComments } from '../AnalyzesComments/AnalyzesComments';

import s from './AnalyzesCard.module.scss';

interface Props {
  analyzes: AnalyzeAnswer[];
}

export const Analyzes = ({ analyzes }: Props) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  function formatCreatedAt(createdAt: string) {
    return moment(createdAt).format('LL');
  }
  return (
    <div className={s.documentsList}>
      {analyzes.map((analyze: AnalyzeAnswer) => (
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
              {formatCreatedAt(analyze.createdAt)}
            </div>

            <div
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className={s.commentsCount}
            >
              {isCommentsOpen ? 'скрыть' : 'показать'} комментарии:{' '}
              {analyze.comments?.length || 0}
            </div>
          </div>
          {isCommentsOpen && <AnalyzesComments comments={analyze.comments} />}
        </div>
      ))}
    </div>
  );
};
