import React from 'react';
import { Question } from '../components/Question/Question';
import { Welcome } from '../components/Welcome/Welcome';

import s from './Questionnaire.module.scss';

interface Props {}

export const Questionnaire = (props: Props) => {
  return (
    <div className={s.questionnaire}>
      <Welcome />
      <Question type={''} />
    </div>
  );
};
