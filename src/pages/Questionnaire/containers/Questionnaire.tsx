import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Question as QuestionComponent } from '../components/Question/Question';
import QuestionService from '../../../services/QuestionService';

import s from './Questionnaire.module.scss';

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

  async function fetchQuestion() {
    const {
      data: { question, index, total },
    } = await QuestionService.getCurrentQuestion();
    if (!question) {
      return history.push('/');
    }
    setQuestion(question);
    setIndex(index);
    setTotal(total);
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (!question) {
    return null;
  }

  async function giveAnswer(answer: CreateAnswerDto) {
    await QuestionService.answer(answer);
    if (index === total) {
      return history.push('/');
    }
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
        //   setIndex(index - 1);
        }}
      />
    </div>
  );
};
export default Questionnaire;
