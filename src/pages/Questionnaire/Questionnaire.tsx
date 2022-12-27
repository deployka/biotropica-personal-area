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
    history.push('profile/tabs/questionnaire');
  };

  if (isLoading || isFetching) {
    return <p>Загрузка...</p>;
  }

  if (!currentUser) return <p>Пользователь не авторизован</p>;

  if (!isLoading && isError) {
    return <p>Произошла ошибка</p>;
  }

  if (!currentQuestionData) {
    return <div>Ошибка</div>;
  }

  const { question, index, total, status } = currentQuestionData;

  const isQuestionnaireFinished = status === 'finished';

  async function giveAnswer(answer: CreateAnswerDto) {
    try {
      await fetchCreateAnswer(answer).unwrap();
      refetchCurrentQuestionData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={s.questionnaire}>
      {question && !isQuestionnaireFinished && (
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

      {isQuestionnaireFinished && (
        <div className={s.infoBar}>
          <p className={s.title}>Отлично, Вы заполнили анкету!</p>
          <p className={s.text}>
            Специалисты могут просматривать её, чтобы давать вам более точные
            рекомендации. Анкета автоматически удалится через три месяца, и вы
            сможете заполнить её повторно.
          </p>
          <div className={s.buttons}>
            <Button isPrimary onClick={onMoveToProfile}>
              В профиль
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Questionnaire;
