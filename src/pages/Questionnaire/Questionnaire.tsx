import React from 'react';
import { useHistory } from 'react-router';
import { CreateAnswerDto } from '../../@types/dto/questionnaire/create-answer.dto';
import {
  useCreateAnswerMutation,
  useGetCurrentQuestionQuery,
} from '../../api/questions';
import { QuestionnaireBody } from '../../components/Questionnaire/Body/Body';

import s from './Questionnaire.module.scss';

const Questionnaire = () => {
  const history = useHistory();

  const {
    data: currentQuestionData,
    isLoading,
    isFetching,
    isError,
    refetch: refetchCurrentQuestionData,
  } = useGetCurrentQuestionQuery();

  const [fetchCreateAnswer, { isLoading: isCreateAnswerLoading }] =
    useCreateAnswerMutation();

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
        return history.push('/');
      }
      refetchCurrentQuestionData();
    } catch (error) {
      console.log(error);
    }
  }

  if (!question) return <p>Произошла ошибка</p>;

  return (
    <div className={s.questionnaire}>
      <QuestionnaireBody
        question={question}
        progress={{ currentIndex: index, total: total + 1 }}
        isQuestionLoading={isFetching}
        isCreateAnswerLoading={isCreateAnswerLoading}
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
