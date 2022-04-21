import React from 'react';
import { intlFormat } from 'date-fns';
import { Formik } from 'formik';
import { TrainingTask } from '../../store/@types/Task';
import Input, { InputTypes } from '../Input/Input';
import { TaskPreviewComments } from '../TaskPreviewComments/TaskPreviewComments';
import { TaskValuePreview } from '../TaskValuePreview/TaskValuePreview';
import {
  translatedFirstTargetType,
  translatedSecondTargetType,
} from '../TrainingTaskEditor/TraningTaskEditorConstants';

import submitIcon from './../../assets/icons/submit.svg';

import s from './TrainingTaskPreview.module.scss';

export type TrainingTaskPreviewProps = {
  task: TrainingTask;
  onSaveFirstValue(value: number | undefined): void;
  onSaveSecondValue(value: number | undefined): void;
  onSendComment(newCommentText: string): void;
};

export function TrainingTaskPreview({
  task,
  onSaveFirstValue,
  onSaveSecondValue,
  onSendComment,
}: TrainingTaskPreviewProps) {
  const formatDate = intlFormat(new Date(task.date), {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  function TaskTime() {
    if (!task.startTime) return <></>;
    return (
      <TaskValuePreview title={'Время'} value={task.startTime.slice(0, 5)} />
    );
  }

  return (
    <div className={s.trainingTaskPreview}>
      <div className={s.line}>
        <TaskValuePreview title={'Название'} value={task.title} />
      </div>
      <div className={s.line}>
        <div className={s.half}>
          <TaskValuePreview title={'Дата'} value={formatDate} />
        </div>
        <div className={s.half}>
          <TaskTime />
        </div>
      </div>
      <div className={s.line}>
        <div className={s.half}>
          <div className={s.title}>
            План ({translatedFirstTargetType[task.firstTargetType]})
          </div>
          <div className={s.fakeInput}>{task.firstTargetValue}</div>
        </div>
        <Formik
          enableReinitialize
          initialValues={{ firstFactValue: task.firstFactValue }}
          onSubmit={values => onSaveFirstValue(values.firstFactValue)}
        >
          {({ values, handleBlur, handleChange, handleSubmit }) => (
            <form className={s.half} onSubmit={handleSubmit}>
              <Input
                type={InputTypes.NAME}
                placeholder="Факт"
                name="firstFactValue"
                label="Факт"
                value={values.firstFactValue}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {values.firstFactValue !== task.firstFactValue && (
                <button className={s.submitButton} type="submit">
                  <img src={submitIcon} />
                </button>
              )}
            </form>
          )}
        </Formik>
      </div>
      <div className={s.line}>
        <div className={s.half}>
          <div className={s.title}>
            План ({translatedSecondTargetType[task.secondTargetType]})
          </div>
          <div className={s.fakeInput}>{task.secondTargetValue}</div>
        </div>
        <Formik
          enableReinitialize
          initialValues={{ secondFactValue: task.secondFactValue }}
          onSubmit={values => onSaveSecondValue(values.secondFactValue)}
        >
          {({ values, handleBlur, handleChange, handleSubmit }) => (
            <form className={s.half} onSubmit={handleSubmit}>
              <Input
                type={InputTypes.NAME}
                placeholder="Факт"
                name="secondFactValue"
                label="Факт"
                value={values.secondFactValue}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {values.secondFactValue !== task.secondFactValue && (
                <button className={s.submitButton} type="submit">
                  <img src={submitIcon} />
                </button>
              )}
            </form>
          )}
        </Formik>
      </div>
      {task.description && (
        <div className={s.line}>
          <div className={s.valueField}>
            <div className={s.title}>установка тренера</div>
            <div
              className={s.text}
              dangerouslySetInnerHTML={{ __html: task.description }}
            ></div>
          </div>
        </div>
      )}
      <div className={s.line}>
        <TaskPreviewComments comments={task.comments} onSend={onSendComment} />
      </div>
    </div>
  );
}
