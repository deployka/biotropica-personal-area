import React from 'react';
import { Question } from '../components/Question/Question';
import { Welcome } from '../components/Welcome/Welcome';

import s from './Questionnaire.module.scss';

const Questionnaire = () => {
  return (
    <div className={s.questionnaire}>
      <Welcome />
      <Question type={''} />
    </div>
  );
};
export default Questionnaire;
