import React from 'react';

import { Formik } from 'formik';
import Input, { InputTypes } from '../../Input/Input';
import { TaskPreviewComments } from '../../Task/PreviewComments/PreviewComments';
import { intlFormat } from 'date-fns';
import { TaskValuePreview } from '../../Task/ValuePreview/ValuePreview';
import { CompetitionTask } from '../../../@types/entities/Task';

import submitIcon from './../../../assets/icons/submit.svg';

import s from './Competition.module.scss';

export type CompetitionTaskPreviewProps = {
  task: CompetitionTask;
  isSpecialist: boolean;
  onSaveFactValue(value: number | undefined): void;
  onSendComment(newCommentText: string): void;
};

export function CompetitionTaskPreview({
  task,
  isSpecialist,
  onSendComment,
  onSaveFactValue,
}: CompetitionTaskPreviewProps) {
  const formatDate = intlFormat(new Date(task.date), {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  function onSave(factValue: number | undefined) {
    onSaveFactValue(factValue);
  }

  return (
    <div className={s.competitionsTaskPreview}>
      <div className={s.line}>
        <TaskValuePreview title={'Название'} value={task.title} />
      </div>
      <div className={s.line}>
        <div className={s.half}>
          <TaskValuePreview title={'Приоритет'} value={task.priority} />
        </div>
        <div className={s.line}>
          <TaskValuePreview title={'Дата'} value={formatDate} />
        </div>
      </div>
      <div className={s.line}>
        <div className={s.half}>
          <div className={s.title}>План</div>
          <div className={s.fakeInput}>{task.targetValue}</div>
        </div>
        {isSpecialist && (
          <div className={s.half}>
            <div className={s.title}>Факт</div>
            <div className={s.fakeInput}>{task.factValue || 0}</div>
          </div>
        )}
        {!isSpecialist && (
          <Formik
            enableReinitialize
            initialValues={{ factValue: task.factValue }}
            onSubmit={values => onSave(values.factValue)}
          >
            {({ values, handleBlur, handleChange, handleSubmit }) => (
              <form className={s.half} onSubmit={handleSubmit}>
                <Input
                  type={InputTypes.NAME}
                  placeholder="Факт"
                  name="factValue"
                  label="Факт"
                  value={values.factValue}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {values.factValue !== task.factValue && (
                  <button className={s.submitButton} type="submit">
                    <img src={submitIcon} />
                  </button>
                )}
              </form>
            )}
          </Formik>
        )}
      </div>
      {task.description && (
        <div className={s.line}>
          <div className={s.valueField}>
            <div className={s.title}>Установка тренера</div>
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
