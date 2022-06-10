import React, { useState } from 'react';

import { IInfoBar, InfoBar } from '../../../../shared/Global/InfoBar/InfoBar';
import { BaseUser } from '../../../../@types/entities/BaseUser';
import { Questionnaire } from './Questionnaire/Questionnaire';
import { Answer } from '../../../../@types/entities/Answer';

import s from './QuestionnaireResults.module.scss';

interface Props {
  answers: Answer[];
}

const questionnaireInfoBar: IInfoBar = {
  title: 'Вы не заполняли анкету',
  text: 'Пожалуйста, заполните анкету',
  href: '/questionnaire',
  bottomLink: 'Заполнить анкету',
};

export const QuestionnaireResults = ({ answers }: Props) => {
  return (
    <div className={s.questionnaireResults}>
      {answers.length ? (
        <Questionnaire answers={answers} />
      ) : (
        <InfoBar infoBar={questionnaireInfoBar} />
      )}
    </div>
  );
};
