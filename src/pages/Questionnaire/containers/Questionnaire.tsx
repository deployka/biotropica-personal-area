import React, { useEffect, useState } from "react";
import { Question as QuestionComponent } from "../components/Question/Question";
import { Welcome } from "../components/Welcome/Welcome";

import s from "./Questionnaire.module.scss";
import $api from "../../../http";
import { AxiosResponse } from "axios";
import QuestionService from "../../../services/QuestionService";
import { progressSaga } from "../../../store/ducks/progress/sagas";

type Question = {
  title: string;
  type: "select" | "multiselect" | "text" | "number";
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
      title: "Укажите ваш пол",
      type: "select",
      options: [
        { value: "1", label: "Мужчина" },
        { value: "2", label: "Женщина" },
      ],
    },
    {
      title: "Вы бы хотели получить план тренировок по: ",
      type: "select",
      options: [
        { value: "1", label: "Бегу" },
        { value: "2", label: "Велоспорту" },
        { value: "3", label: "Силовым видам спорта" },
      ],
    },
    {
      title: "Какой срок?",
      type: "number",
    },
  ];

  // const multiSelectQuestions = [
  //   "Астма",
  //   "Диабет",
  //   "Заболевания щитовидной железы",
  //   "ОНМК (Острые Нарушения Мозгового Кровообращения)",
  //   "ОИМ (Острый Инфаркт Миакарда)",
  // ];

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
        type={questions[progress.current - 1].type as Question["type"]}
        options={questions[progress.current - 1].options}
        onChange={() => console.log("onChange")}
        onNext={() => {
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
