import React from 'react';
import { useHistory } from 'react-router';
import type { Answer } from '../../@types/entities/Answer';
import { Client } from '../../@types/entities/Client';
import { useResetMutation } from '../../api/questions';

import { IInfoBar, InfoBar } from '../../shared/Global/InfoBar/InfoBar';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { useAppSelector } from '../../store/storeHooks';
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
  const history = useHistory();

  const [resetQuestionnaire] = useResetMutation();

  const currentUser = useAppSelector(selectCurrentUser);
  const isFinished = (currentUser as Client | undefined)?.questionHash?.includes('FINISHED');

  const handleResetQuestionnaire = async () => {
    try {
      await resetQuestionnaire().unwrap();
      history.push('/questionnaire');
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = async () => {
    history.push('/questionnaire');
  };

  if (!isAccess) return <p>Нет доступа</p>;
  // FIXME: add loader
  if (isLoading) return <p>Загрузка...</p>;
  if (!answers.length) {
    return <InfoBar infoBar={isPublic ? publicInfoBar : privateInfoBar} />;
  }

  return (
    <div className={s.questionnaireCard}>
      <QuestionnaireTabHeader
        isPublic={isPublic}
        isFinished={isFinished}
        onContinue={handleContinue}
        onReset={handleResetQuestionnaire}
      />
      <QuestionnaireTabAnswers answers={answers} />
    </div>
  );
};
