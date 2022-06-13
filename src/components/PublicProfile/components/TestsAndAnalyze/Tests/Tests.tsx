import React from 'react';
import { InfoBar } from '../../../../../shared/Global/InfoBar/InfoBar';

import { Questionnaire } from '../Questionnaire/Questionnaire';
import { Answer } from '../../../../../@types/entities/Answer';
import { Analyze } from '../../../../../@types/entities/Analyze';
import { AnalyzeAnswer } from '../../../../../@types/entities/AnalyzeAnswer';

import s from './Tests.module.scss';

interface Props {
  analyzeTypes: Analyze[];
  // TODO: переделать тип в QuestionnaireAnswer
  questionnaireAnswers: Answer[];
  analyzes: AnalyzeAnswer[];
  isLoadingComment: boolean;
  onAddComment: (comment: string, analyzeId: number) => void;
  onDeleteComment: (id: number) => void;
}

export const Test = ({ questionnaireAnswers }: Props) => {
  const testInfoBar = {
    title: 'Пользователь не заполнял анкету',
    text: '',
  };

  return (
    <div className={s.test}>
      {questionnaireAnswers.length ? (
        <Questionnaire
          answers={questionnaireAnswers
            .slice()
            .sort((a, b) => a.question.order - b.question.order)}
        />
      ) : (
        <InfoBar infoBar={testInfoBar} />
      )}
    </div>
  );
};
