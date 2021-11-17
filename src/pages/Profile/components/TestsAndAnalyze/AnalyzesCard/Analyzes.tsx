import React from 'react';
import moment from 'moment';
import { AnalyzeAnswer } from '../../../../../store/ducks/analyze/contracts/state';
import { getMediaLink } from '../../../../../utils/mediaHelper';
import documentSvg from '../../../../../assets/icons/profile/document.svg';

import s from './AnalyzesCard.module.scss';

interface Props {
  analyzes: AnalyzeAnswer[];
}

export const Analyzes = ({ analyzes }: Props) => {
  return (
    <div className={s.card__analyzes__documents__list}>
      {analyzes.map((analyze: AnalyzeAnswer) => (
        <div key={analyze.id} className={s.document}>
          <div className={s.document__top}>
            <img src={documentSvg} className={s.document__img} />
            <a
              target="_blank"
              href={getMediaLink(analyze.filePath)}
              className={s.document__name}
            >
              {analyze.text}
            </a>
          </div>
          <div className={s.document__createdAt}>
            {moment(analyze.createdAt).format('LL')}
          </div>
        </div>
      ))}
    </div>
  );
};
