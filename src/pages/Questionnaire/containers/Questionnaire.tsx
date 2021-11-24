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
  ];

  const [progress, setProgress] = useState({
    current: 1,
    of: questions.length,
  });

  return (
    <div className={s.questionnaire}>
      {/*<Welcome />*/}

      <QuestionComponent
        progress={progress}
        title={questions[progress.current - 1].title}
        type={questions[progress.current - 1].type as Question['type']}
        options={questions[progress.current - 1].options}
        onChange={(answer) => console.log(answer)}
        onNext={() => {
          if (progress.current === progress.of) return;
          setProgress({ ...progress, current: progress.current + 1 });
        }}
        onPrev={() => {
          setProgress({ ...progress, current: progress.current - 1 });
        }}
      />
    </div>
  );
};
export default Questionnaire;
