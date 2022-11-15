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

const privateInfoBar: IInfoBar = {
  title: 'Вы не заполняли анкету',
  text: 'Пожалуйста, заполните анкету',
  href: '/questionnaire',
  bottomLink: 'Заполнить анкету',
};

const publicInfoBar: IInfoBar = {
  title: 'Пользователь не заполнял анкету',
};

export const QuestionnaireTab = ({
  answers,
  isLoading,
  isAccess = true,
  isPublic,
}: Props) => {
  if (!isAccess) return <p>Нет доступа</p>;
  // FIXME: add loader
  if (isLoading) return <p>Загрузка...</p>;
  if (!answers.length) {
    return <InfoBar infoBar={isPublic ? publicInfoBar : privateInfoBar} />;
  }
  return (
    <div className={s.questionnaireCard}>
      <QuestionnaireTabHeader isPublic={isPublic} />
      <QuestionnaireTabAnswers answers={answers} />
    </div>
  );
};
