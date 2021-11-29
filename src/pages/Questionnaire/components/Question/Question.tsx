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
  title: string;
  type: 'select' | 'multiselect' | 'text' | 'number';
  progress: {
    currentIndex: number;
    total: number;
  };
  placeholder?: string;
  options?: {
    value: string;
    label: string;
  }[];
  onNext(val: string): void;
  onPrev(): void;
};

export const Question = (props: Props) => {
  const [answer, setAnswer] = useState<string>('');
  const [multiAnswer, setMultiAnswer] = useState<string[]>([]);

  const placeholder = props.placeholder || 'Введите ответ';
  const options = props.options || [];

  const variations = {
    number: (
      <NumberQuestion
        value={Number(answer)}
        placeholder={placeholder}
        onChange={val => setAnswer(String(val))}
      />
    ),
    text: (
      <TextQuestion
        value={String(answer)}
        placeholder={placeholder}
        onChange={setAnswer}
      />
    ),
    select: (
      <SelectQuestion value={answer} onChange={setAnswer} options={options} />
    ),
    multiselect: (
      <MultiSelectQuestion
        value={multiAnswer}
        onChange={setMultiAnswer}
        options={options}
      />
    ),
  };

  const onNext = () => {
    if (['select', 'number', 'text'].includes(props.type) && answer) {
      setAnswer('');
      props.onNext(answer);
    }

    if (props.type === 'multiselect' && multiAnswer) {
      setMultiAnswer([]);
      props.onNext(JSON.stringify(multiAnswer));
    }
  };

  return (
    <div className={s.question}>
      <Progress options={props.progress} />

      <div className={s.question__body}>
        <div className={s.question__number}>
          {props.progress.currentIndex + 1} вопрос
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
