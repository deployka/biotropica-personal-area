import React, { useEffect, useState } from 'react';
import { Question as QuestionComponent } from '../components/Question/Question';
import { Welcome } from '../components/Welcome/Welcome';

import s from './Questionnaire.module.scss';
import $api from '../../../http';
import { AxiosResponse } from 'axios';
import QuestionService from '../../../services/QuestionService';
import { progressSaga } from '../../../store/ducks/progress/sagas';

type Question = {
  title: string;
  type: 'select' | 'multiselect' | 'text' | 'number';
  placeholder?: string;
  options?: {
    value: string;
    label: string;
  }[];
};

const Questionnaire = () => {
  // const [question, setQuestion] = useState<null|Question>(null);
  // const [answerText, setAnswerText] = useState('');
  // useEffect(() => {
  //     fetchQuestion();
  // }, [])
  //
  // async function fetchQuestion() {
  //     const {data: question} = await QuestionService.getNextQuestion();
  //     setQuestion(question);
  // }
  //
  // async function giveAnswer(answer: CreateAnswerDto) {
  //     await QuestionService.answer(answer);
  //     await fetchQuestion();
  // }

  const questions = [
    {
      title: 'Укажите ваш пол',
      type: 'select',
      options: [
        { value: 'man', label: 'Мужчина' },
        { value: 'woman', label: 'Женщина' },
      ],
    },
    {
      title: 'Вы бы хотели получить план тренировок по: ',
      type: 'select',
      options: [
        { value: 'running', label: 'Бегу' },
        { value: 'cycling', label: 'Велоспорту' },
        { value: 'strength', label: 'Силовым видам спорта' },
      ],
    },
    {
      title: 'Какой срок?',
      type: 'number',
    },
    {
      title:
        'Есть ли у Вас диагностированные / ранее перенесенные или хронические заболевания из списка ниже:',
      type: 'multiselect',
      options: [
        { value: '1', label: 'Астма' },
        { value: '2', label: 'Диабет' },
        { value: '3', label: 'Заболевания щитовидной железы' },
        {
          value: '4',
          label: 'ОНМК (Острые Нарушения Мозгового Кровообращения)',
        },
        { value: '5', label: 'ОИМ (Острый Инфаркт Миакарда)' },
      ],
    },
  ] as Question[];

  const [progress, setProgress] = useState({
    currentIndex: 1,
    total: questions.length,
  });

  return (
    <div className={s.questionnaire}>
      {/*<Welcome />*/}

      <QuestionComponent
        title={questions[progress.currentIndex - 1].title}
        type={questions[progress.currentIndex - 1].type}
        progress={progress}
        placeholder={questions[progress.currentIndex - 1].placeholder}
        options={questions[progress.currentIndex - 1].options}
        onChange={(answer) => console.log(answer)}
        onNext={() => {
          if (progress.currentIndex === progress.total) return;
          setProgress({ ...progress, currentIndex: progress.currentIndex + 1 });
        }}
        onPrev={() => {
          setProgress({ ...progress, currentIndex: progress.currentIndex - 1 });
        }}
      />
    </div>
  );
};
export default Questionnaire;
