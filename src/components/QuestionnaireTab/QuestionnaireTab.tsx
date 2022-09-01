import React, { useState } from 'react';
import type { Answer } from '../../@types/entities/Answer';

import { IInfoBar, InfoBar } from '../../shared/Global/InfoBar/InfoBar';
import { QuestionnaireTabAnswers } from './Answers/Answers';
import { QuestionnaireTabHeader } from './Header/Header';

import s from './QuestionnaireTab.module.scss';

type Props = {
  answers: Answer[];
  isAccess?: boolean;
  isLoading?: boolean;
  isPublic?: boolean;
};

const questionnaireInfoBar: IInfoBar = {
  title: 'Вы не заполняли анкету',
  text: 'Пожалуйста, заполните анкету',
  href: '/questionnaire',
  bottomLink: 'Заполнить анкету',
};

export const QuestionnaireTab = ({
  answers,
  isLoading,
  isAccess = true,
  isPublic,
}: Props) => {
  if (!isAccess) return <p>Нет доступа</p>;
  // FIXME: add loader
  if (isLoading) {
    <p>Загрузка...</p>;
  }
  if (!answers.length) return <InfoBar infoBar={questionnaireInfoBar} />;
  return (
    <div className={s.questionnaireCard}>
      <QuestionnaireTabHeader isPublic={isPublic} />
      <QuestionnaireTabAnswers answers={answers} />
    </div>
  );
};
