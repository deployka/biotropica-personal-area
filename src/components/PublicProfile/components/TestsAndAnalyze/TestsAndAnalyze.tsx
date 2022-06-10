import React from 'react';
import s from './TestsAndAnalyze.module.scss';
import { AnalyzesCard } from './AnalyzesCard/AnalyzesCard';
import { InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';

import {
  Analyze,
  AnalyzeAnswer,
} from '../../../../store/ducks/analyze/contracts/state';

import { Questionnaire } from './Questionnaire/Questionnaire';

interface Props {
  analyzeTypes: Analyze[];
  questionnaireAnswers: Answer[];
  analyzes: AnalyzeAnswer[];
  isLoadingComment: boolean;
  onAddComment: (comment: string, analyzeId: number) => void;
  onDeleteComment: (id: number) => void;
}

export const TestsAndAnalyze = ({
  analyzeTypes,
  questionnaireAnswers,
  analyzes,
  onAddComment,
  isLoadingComment,
  onDeleteComment,
}: Props) => {
  const testInfoBar = {
    title: 'Пользователь не заполнял анкету',
    text: '',
  };

  const analyzesInfoBar = {
    title: 'Пользователь не добавлял анализы',
    text: '',
  };

  return (
    <div className={s.tests__and__analyze}>
      {questionnaireAnswers.length ? (
        <Questionnaire
          answers={questionnaireAnswers
            .slice()
            .sort((a, b) => a.question.order - b.question.order)}
        />
      ) : (
        <InfoBar infoBar={testInfoBar} />
      )}
      {analyzes.length ? (
        <AnalyzesCard
          onDeleteComment={onDeleteComment}
          isLoadingComment={isLoadingComment}
          onAddComment={onAddComment}
          analyzeTypes={analyzeTypes}
          analyzes={analyzes}
        />
      ) : (
        <InfoBar infoBar={analyzesInfoBar} />
      )}
    </div>
  );
};
