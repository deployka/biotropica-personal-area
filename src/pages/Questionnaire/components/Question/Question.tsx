import React from "react";
import { Progress } from "./Progress/Progress";
import {
  NumberQuestion,
  TextQuestion,
  SelectQuestion,
  MultiSelectQuestion,
} from "./Variations";
import { QuestionNav as Nav } from "./QuestionNav";
import s from "./Question.module.scss";
import { useState } from "react";

type Props = {
  type: "select" | "multiselect" | "text" | "number";
  options?: {
    value: string;
    label: string;
  }[];
  qId: number;
  title: string;
  onChange(val: string | number): void;
  onNext(): void;
  onPrev(): void;
};

export const Question = (props: Props) => {
  const [answer, setAnswer] = useState<string | number>(0);

  const progressTest = {
    current: 56,
    of: 56,
  };

  const testQuestions = [
    "Астма",
    "Диабет",
    "Заболевания щитовидной железы",
    "ОНМК (Острые Нарушения Мозгового Кровообращения)",
    "ОИМ (Острый Инфаркт Миакарда)",
  ];

  const variations = {
    number: <NumberQuestion onAnswer={setAnswer} />,
    text: <TextQuestion onAnswer={setAnswer} />,
    select: <SelectQuestion onAnswer={setAnswer} options={props.options} />,
    multiselect: <MultiSelectQuestion />,
  };

  const onNext = () => {
    console.log(answer);
    props.onChange(answer);
    props.onNext();
  };

  return (
    <div className={s.question}>
      <Progress options={progressTest} />

      <div className={s.question__body}>
        <div className={s.question__number}>{props.qId} вопрос</div>
        <h2 className={s.question__title}>{props.title}</h2>
        {variations[props.type]}
      </div>

      <Nav onNext={onNext} onPrev={props.onPrev} />

      {/* <div className={s.question__body}>
        <div className={s.question__number}>4 вопрос</div>
        <h2 className={s.question__title}>
          Укажите Ваше артериальное давление
        </h2>
        <input
          className={s.question__input}
          type="text"
          placeholder="Введите давление"
        />
        <h2 className={s.question__title}>Укажите пульс в состоянии покоя</h2>
        <input
          className={s.question__input}
          type="text"
          placeholder="Введите пульс"
        />
      </div> */}

      {/*<div className={s.question__body}>
        <div className={s.question__number}>5 вопрос</div>
        <h2 className={s.question__title}>
          Есть ли у Вас диагностированные / ранее перенесенные или хронические
          заболевания из списка ниже:
        </h2>
        <div className={s.question__answer__selectors}>
          {testQuestions.map((question) => (
            <div className={s.selector}>
              <div className={s.selector__title}>{question} </div>
              <div className={s.selector__btns}>
                <button className={classNames(s.selector__btn, s.selected)}>
                  да
                </button>
                <button className={s.selector__btn}>нет</button>
              </div>
            </div>
          ))}
        </div>
      </div>*/}
    </div>
  );
};
