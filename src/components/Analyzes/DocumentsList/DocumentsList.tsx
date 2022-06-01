import React, { useState } from 'react';
import { AnalyzeAnswer } from '../../../store/ducks/analyze/contracts/state';
import { Document } from './Document';

import s from './DocumentsList.module.scss';

interface Props {
  analyzes: AnalyzeAnswer[];
}

export const DocumentsList = ({ analyzes }: Props) => {
  return (
    <div className={s.documentsList}>
      {analyzes.map(analyze => (
        <Document key={analyze.id} analyze={analyze} />
      ))}
    </div>
  );
};
