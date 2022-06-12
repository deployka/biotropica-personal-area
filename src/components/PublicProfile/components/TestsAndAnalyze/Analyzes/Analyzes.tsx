import React from 'react';
import { Analyze } from '../../../../../@types/entities/Analyze';
import { AnalyzeAnswer } from '../../../../../@types/entities/AnalyzeAnswer';
import { InfoBar } from '../../../../../shared/Global/InfoBar/InfoBar';
import { AnalyzesCard } from '../AnalyzesCard/AnalyzesCard';

import s from './Analyzes.module.scss';

type Props = {
  analyzes: AnalyzeAnswer[];
  analyzeTypes: Analyze[];
  isLoadingComment: boolean;
  onAddComment: (comment: string, analyzeId: number) => void;
  onDeleteComment: (id: number) => void;
};

const infoBar = {
  title: 'Пользователь не добавлял анализы',
  text: '',
};

export const PublicAnalyzes = ({
  analyzes,
  analyzeTypes,
  isLoadingComment,
  onAddComment,
  onDeleteComment,
}: Props) => {
  return (
    <div className={s.analyzes}>
      {analyzes.length ? (
        <AnalyzesCard
          onDeleteComment={onDeleteComment}
          isLoadingComment={isLoadingComment}
          onAddComment={onAddComment}
          analyzeTypes={analyzeTypes}
          analyzes={analyzes}
        />
      ) : (
        <InfoBar infoBar={infoBar} />
      )}
    </div>
  );
};
