import React from 'react';
import { useGetQuestionnaireAnswersQuery } from '../../../api/user';
import { QuestionnaireTab } from '../../../components/QuestionnaireTab/QuestionnaireTab';

type Props = {
  userId: number;
  isAccess: boolean;
};

export const Questionnaire = ({ isAccess, userId }: Props) => {
  const {
    data: questionnaireAnswers = [],
    isLoading: isQuestionnaireAnswersLoading,
  } = useGetQuestionnaireAnswersQuery(userId);
  return (
    <QuestionnaireTab
      isPublic={false}
      isAccess={isAccess}
      isLoading={isQuestionnaireAnswersLoading}
      answers={questionnaireAnswers}
    />
  );
};
