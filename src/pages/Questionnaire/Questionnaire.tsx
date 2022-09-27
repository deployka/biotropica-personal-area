import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CreateAnswerDto } from '../../@types/dto/questionnaire/create-answer.dto';
import { Client } from '../../@types/entities/Client';
import {
  useCreateAnswerMutation,
  useGetCurrentQuestionQuery,
} from '../../api/questions';
import Button from '../../components/Button/Button';
import { QuestionnaireBody } from '../../components/Questionnaire/Body/Body';
import { selectCurrentUser } from '../../store/slices/authSlice';

import s from './Questionnaire.module.scss';

const Questionnaire = () => {
  const history = useHistory();

  const currentUser = useSelector(selectCurrentUser) as Client;

  const {
    data: currentQuestionData,
    isLoading,
    isFetching,
    isError,
    refetch: refetchCurrentQuestionData,
  } = useGetCurrentQuestionQuery();

  const [fetchCreateAnswer, { isLoading: isCreateAnswerLoading }] =
    useCreateAnswerMutation();

  const onMoveToProfile = () => {
    history.push('/profile');
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (!currentUser) return <p>Пользователь не авторизован</p>;

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
      // if (index === total) {
      //   return history.push('/');
      // }
      refetchCurrentQuestionData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={s.questionnaire}>
      {question && (
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
      )}

      {console.log(currentUser.questionHash)}

      {currentUser.questionHash?.includes('FINISHED') && (
        <div className={s.infoBar}>
          <p className={s.title}>Анкета заполнена!</p>
          <p className={s.text}>
            Специалисты смогу просматривать ее для назначения более точных
            рекомендаций. Рекомендуем проходить анкету повторно каждые 3 месяца.
          </p>
          <Button onClick={onMoveToProfile}>В профиль</Button>
        </div>
      )}
    </div>
  );
};
export default Questionnaire;
