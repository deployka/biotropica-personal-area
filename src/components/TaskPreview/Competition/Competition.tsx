import React, { useEffect, useState } from 'react';

import { Formik } from 'formik';
import Input, { InputTypes } from '../../Input/Input';
import { TaskPreviewComments } from '../../Task/PreviewComments/PreviewComments';
import { intlFormat } from 'date-fns';
import { TaskValuePreview } from '../../Task/ValuePreview/ValuePreview';
import { CompetitionTask } from '../../../@types/entities/Task';

import submitIcon from './../../../assets/icons/submit.svg';

import s from './Competition.module.scss';
import { useDebounce } from '../../../hooks/useDebounce';

export type CompetitionTaskPreviewProps = {
  task: CompetitionTask;
  isSpecialist: boolean;
  isCommentsLoading?: boolean;
  onSaveFactValue(value: string | undefined): void;
  onSendComment(newCommentText: string): void;
  onDeleteComment(commentId: string): void;
};

export function CompetitionTaskPreview({
  task,
  isSpecialist,
  isCommentsLoading,
  onSendComment,
  onSaveFactValue,
  onDeleteComment,
}: CompetitionTaskPreviewProps) {
  const formatDate = intlFormat(new Date(task.date), {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const [factValue, setFactValue] = useState(task.factValue);

  const debouncedFactValue = useDebounce(factValue, 400);

  useEffect(() => {
    onSaveFactValue(debouncedFactValue);
  }, [debouncedFactValue]);

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
          <div className={s.half}>
            <div className={s.input}>
              <p className={s.title}>Факт</p>
              <input
                placeholder="Факт"
                name="factValue"
                value={factValue}
                onChange={e => setFactValue(e.target.value)}
              />
            </div>
          </div>
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
        <TaskPreviewComments
          comments={task.comments}
          isLoading={isCommentsLoading}
          onSend={onSendComment}
          onDeleteComment={onDeleteComment}
        />
      </div>
    </div>
  );
}
