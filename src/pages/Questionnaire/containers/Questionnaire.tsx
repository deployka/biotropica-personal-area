import React, { useEffect, useState } from 'react';
import { Question as QuestionComponent } from '../components/Question/Question';
import { Welcome } from '../components/Welcome/Welcome';

import s from './Questionnaire.module.scss';
import $api from '../../../http';
import { AxiosResponse } from 'axios';
import QuestionService from '../../../services/QuestionService';
import { progressSaga } from '../../../store/ducks/progress/sagas';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';

type Question = {
  title: string;
  type: 'select' | 'multiselect' | 'text' | 'number';
  key: string;
  allowedAnswers: string[] | null;
};

const Questionnaire = () => {
  const [question, setQuestion] = useState<null | Question>(null);
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (!question) {
    return null;
  }

  async function fetchQuestion() {
    const {
      data: { question, index, total },
    } = await QuestionService.getCurrentQuestion();
    setQuestion(question);
    setIndex(index);
    setTotal(total);
  }

  async function giveAnswer(answer: CreateAnswerDto) {
    console.log('giveAnswer', index);
    if (index === total) {
      console.log('index');
      return history.push('/');
    }
    await QuestionService.answer(answer);
    await fetchQuestion();
  }

  const options = question.allowedAnswers
    ? question.allowedAnswers.map(it => ({
        value: it,
        label: it,
      }))
    : [];

  return (
    <div className={s.questionnaire}>
      <QuestionComponent
        progress={{
          currentIndex: index,
          total,
        }}
        title={question.title}
        type={question.type as Question['type']}
        options={options}
        onNext={text => {
          giveAnswer({
            text: text as string,
            questionKey: question.key,
          });
        }}
        onPrev={() => {
          // setProgress({...progress, currentIndex: progress.currentIndex - 1});
        }}
      />
    </div>
  );
};
export default Questionnaire;
