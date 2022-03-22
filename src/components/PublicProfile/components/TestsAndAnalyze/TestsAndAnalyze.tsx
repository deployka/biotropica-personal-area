import React from 'react';
import s from './TestsAndAnalyze.module.scss';
import { AnalyzesCard } from './AnalyzesCard/AnalyzesCard';
import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';

import {
  Analyze,
  AnalyzeAnswer,
} from '../../../../store/ducks/analyze/contracts/state';

import { Questionnaire } from './Questionnaire/Questionnaire';

interface Props {
  analyzeTypes: Analyze[];
  questionnaireAnswers: Answer[];
  analyzes: AnalyzeAnswer[];
}

export const TestsAndAnalyze = ({
  analyzeTypes,
  questionnaireAnswers,
  analyzes,
}: Props) => {
  const testInfoBar: IInfoBar = {
    title: 'Пользователь не заполнял анкету',
    text: '',
  };

  const analyzesInfoBar: IInfoBar = {
    title: 'Пользователь не добавлял анализы',
    text: '',
  };

  return (
    <div className={s.tests__and__analyze}>
      {questionnaireAnswers.length
        ? (
          <Questionnaire
            answers={questionnaireAnswers
              .slice()
              .sort((a, b) => a.question.order - b.question.order)}
          />
        )
        : (
          <InfoBar infoBar={testInfoBar} />
        )}
      {analyzes.length
        ? (
          <AnalyzesCard analyzeTypes={analyzeTypes} analyzes={analyzes} />
        )
        : (
          <InfoBar infoBar={analyzesInfoBar} />
        )}
    </div>
  );
};
