import React, {useEffect, useState} from 'react';
import { Question as QuestionComponent } from '../components/Question/Question';
import { Welcome } from '../components/Welcome/Welcome';

import s from './Questionnaire.module.scss';
import $api from "../../../http";
import {AxiosResponse} from "axios";
import QuestionService from "../../../services/QuestionService";

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

  return (
    <div className={s.questionnaire}>
      {/*<Welcome />*/}
      <QuestionComponent
          type={'select'}
          options={[{value: '1', label: 'One'}]}
          onChange={() => console.log('onChange')}
          onNext={() => console.log('onNext')}
          onPrev={() => console.log('onPrev')}
      />
    </div>
  );
};
export default Questionnaire;
