import classNames from 'classnames';
import { QuestionnaireSvgSelector } from '../../../../assets/icons/questionnaire/QuestionnaireSvgSelector';
import { Progress } from './Progress/Progress';
import s from './Question.module.scss';

type Props = ({
  type: 'text'|'number'
} | {
  type: 'select'|'multiselect'
  options: {
    value: string;
    label: string;
  }[]
}) & {
  onChange(val: string|number): void;
  onNext(): void;
  onPrev(): void;
}

export const Question = ({ type }: Props) => {
  const progressTest = {
    current: 56,
    of: 56,
  };

  const testQuestions = [
    'Астма',
    'Диабет',
    'Заболевания щитовидной железы',
    'ОНМК (Острые Нарушения Мозгового Кровообращения)',
    'ОИМ (Острый Инфаркт Миакарда)',
  ];

  return (
    <div className={s.question}>
       <Progress options={progressTest} />

      {/* <div className={s.question__body}>
        <div className={s.question__number}>1 вопрос</div>
        <h2 className={s.question__title}>Укажите ваш пол</h2>
        <div className={s.big__buttons__select}>
          <button className={s.big__button}>Женщина</button>
          <button className={classNames(s.big__button, s.selected)}>
            Мужчина
          </button>
        </div>
        <div className={s.nav__btns}>
          <button className={s.btn__prev}>
            <div className={s.btn__prev__icon}>
              <QuestionnaireSvgSelector id="arrow" />
            </div>
            <div className={s.btn__prev__text}>назад</div>
          </button>
          <button className={s.btn__next}>
            <div className={s.btn__next__text}>далее</div>
            <div className={s.btn__next__icon}>
              <QuestionnaireSvgSelector id="arrow" />
            </div>
          </button>
        </div>
      </div> */}

      {/*<div className={s.question__body}>
        <div className={s.question__number}>2 вопрос</div>
        <h2 className={s.question__title}>
          Вы хотели бы получить план
          <br /> тренировок от тренера по :
        </h2>
        <div className={s.small__buttons__select}>
          <button className={s.small__button}>Бегу</button>
          <button className={s.small__button}>Велоспорту</button>
          <button className={classNames(s.small__button, s.selected)}>
            Силовым видам спорта
          </button>
        </div>
        <div className={s.nav__btns}>
          <button className={s.btn__prev}>
            <div className={s.btn__prev__icon}>
              <QuestionnaireSvgSelector id="arrow" />
            </div>
            <div className={s.btn__prev__text}>назад</div>
          </button>
          <button className={s.btn__next}>
            <div className={s.btn__next__text}>далее</div>
            <div className={s.btn__next__icon}>
              <QuestionnaireSvgSelector id="arrow" />
            </div>
          </button>
        </div>
      </div>*/}
      {/*<div className={s.question__body}>
        <div className={s.question__number}>3 вопрос</div>
        <h2 className={s.question__title}>Какой срок?</h2>
        <input
          className={s.question__input}
          type="text"
          placeholder="Введите срок"
        />
        <div className={s.nav__btns}>
          <button className={s.btn__prev}>
            <div className={s.btn__prev__icon}>
              <QuestionnaireSvgSelector id="arrow" />
            </div>
            <div className={s.btn__prev__text}>назад</div>
          </button>
          <button className={s.btn__next}>
            <div className={s.btn__next__text}>далее</div>
            <div className={s.btn__next__icon}>
              <QuestionnaireSvgSelector id="arrow" />
            </div>
          </button>
        </div>
      </div>*/}
      {/*<div className={s.question__body}>
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
        <div className={s.nav__btns}>
          <button className={s.btn__prev}>
            <div className={s.btn__prev__icon}>
              <QuestionnaireSvgSelector id="arrow" />
            </div>
            <div className={s.btn__prev__text}>назад</div>
          </button>
          <button className={s.btn__next}>
            <div className={s.btn__next__text}>далее</div>
            <div className={s.btn__next__icon}>
              <QuestionnaireSvgSelector id="arrow" />
            </div>
          </button>
        </div>
      </div>*/}
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
        <div className={s.nav__btns}>
          <button className={s.btn__prev}>
            <div className={s.btn__prev__icon}>
              <QuestionnaireSvgSelector id="arrow" />
            </div>
            <div className={s.btn__prev__text}>назад</div>
          </button>
          <button className={s.btn__next}>
            <div className={s.btn__next__text}>далее</div>
            <div className={s.btn__next__icon}>
              <QuestionnaireSvgSelector id="arrow" />
            </div>
          </button>
        </div>
      </div>*/}
    </div>
  );
};
