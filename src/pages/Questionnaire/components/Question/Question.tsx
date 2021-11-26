import React from 'react';
import { Progress } from './Progress/Progress';
import {
  NumberQuestion,
  TextQuestion,
  SelectQuestion,
  MultiSelectQuestion,
} from './Variations';
import { QuestionNav as Nav } from './QuestionNav';
import s from './Question.module.scss';
import { useState } from 'react';

type Props = {
  progress: {
    currentId: number;
    total: number;
  };
  type: 'select' | 'multiselect' | 'text' | 'number';
  options?: {
    value: string;
    label: string;
  }[];
  title: string;
  onChange(val: string | number | string[] | number[]): void;
  onNext(): void;
  onPrev(): void;
};

export const Question = (props: Props) => {
  const [answer, setAnswer] = useState<string | number>(0);
  const [multiAnswer, setMultiAnswer] = useState<number[] | string[]>([]);

  const variations = {
    number: <NumberQuestion value={0} onChange={setAnswer} />,
    text: <TextQuestion value={''} onChange={setAnswer} />,
    select: (
      <SelectQuestion value={''} onChange={setAnswer} options={props.options} />
    ),
    multiselect: (
      <MultiSelectQuestion
        value={[]}
        onChange={setMultiAnswer}
        options={props.options}
      />
    ),
  };

  const onNext = () => {
    if (['select', 'number', 'text'].includes(props.type) && answer) {
      props.onChange(answer);
      setAnswer(0);
      props.onNext();
    }

    if (props.type === 'multiselect' && multiAnswer) {
      props.onChange(multiAnswer);
      setMultiAnswer([]);
      props.onNext();
    }
  };

  return (
    <div className={s.question}>
      <Progress options={props.progress} />

      <div className={s.question__body}>
        <div className={s.question__number}>
          {props.progress.currentId} вопрос
        </div>
        <h2 className={s.question__title}>{props.title}</h2>
        {variations[props.type]}
      </div>

      <Nav progress={props.progress} onNext={onNext} onPrev={props.onPrev} />

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
