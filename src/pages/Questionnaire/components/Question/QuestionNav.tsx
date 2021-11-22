import React from "react";
import { QuestionnaireSvgSelector } from "../../../../assets/icons/questionnaire/QuestionnaireSvgSelector";
import s from "./Question.module.scss";

type Props = {
  onNext(): void;
  onPrev(): void;
};

export const QuestionNav = ({ onNext, onPrev }: Props) => {
  return (
    <div className={s.nav__btns}>
      <button className={s.btn__prev} onClick={onPrev}>
        <div className={s.btn__prev__icon}>
          <QuestionnaireSvgSelector id="arrow" />
        </div>
        <div className={s.btn__prev__text}>назад</div>
      </button>
      <button className={s.btn__next} onClick={onNext}>
        <div className={s.btn__next__text}>далее</div>
        <div className={s.btn__next__icon}>
          <QuestionnaireSvgSelector id="arrow" />
        </div>
      </button>
    </div>
  );
};
