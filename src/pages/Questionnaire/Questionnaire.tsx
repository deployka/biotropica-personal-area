import React from 'react';
import { useHistory } from 'react-router';
import { CreateAnswerDto } from '../../@types/dto/questionnaire/create-answer.dto';
import {
  useCreateAnswerMutation,
  useGetCurrentQuestionQuery,
} from '../../api/questions';
import { QuestionnaireBody } from '../../components/Questionnaire/Body/Body';

import s from './Questionnaire.module.scss';

type Question = {
  title: string;
  type: 'select' | 'multiselect' | 'text' | 'number';
  key: string;
  allowedAnswers: string[] | null;
};

const Questionnaire = () => {
  const history = useHistory();

  const {
    data: currentQuestionData,
    isLoading,
    isError,
    refetch: refetchCurrentQuestionData,
  } = useGetCurrentQuestionQuery();

  const [fetchCreateAnswer] = useCreateAnswerMutation();

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (!isLoading && isError) {
    return <p>Произошла ошибка</p>;
  }

  if (!currentQuestionData) {
    return <div>Ошибка</div>;
  }

  const { question, index, total } = currentQuestionData;

  async function giveAnswer(answer: CreateAnswerDto) {
    try {
      await fetchCreateAnswer(answer).unwrap();
      if (index === total) {
        // return history.push('/');
      }
      refetchCurrentQuestionData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={s.questionnaire}>
      <QuestionnaireBody
        question={question}
        progress={{ currentIndex: index, total }}
        onNext={(answer: string) => {
          giveAnswer({
            text: answer,
            questionKey: question.key,
          });
        }}
        onPrev={() => {
          console.log('prev');
        }}
      />
    </div>
  );
};
export default Questionnaire;
