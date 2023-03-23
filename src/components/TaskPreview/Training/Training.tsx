import React, { useEffect, useState } from 'react';
import { intlFormat } from 'date-fns';
import { TaskPreviewComments } from '../../Task/PreviewComments/PreviewComments';
import { TaskValuePreview } from '../../Task/ValuePreview/ValuePreview';
import {
  translatedFirstTargetType,
  translatedSecondTargetType,
} from '../../TaskEditor/Training/TrainingConstants';

import s from './Training.module.scss';
import { TrainingTask } from '../../../@types/entities/Task';
import { useDebounce } from '../../../hooks/useDebounce';

export type TrainingTaskPreviewProps = {
  task: TrainingTask;
  isSpecialist: boolean;
  isCommentsLoading?: boolean;
  onSaveFirstValue(value: string | undefined): void;
  onSaveSecondValue(value: string | undefined): void;
  onSendComment(newCommentText: string): void;
  onDeleteComment(commentId: string): void;
};

export function TrainingTaskPreview({
  task,
  isSpecialist,
  onSaveFirstValue,
  onSaveSecondValue,
  onSendComment,
  isCommentsLoading,
  onDeleteComment,
}: TrainingTaskPreviewProps) {
  const formatDate = intlFormat(new Date(task.date), {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const [firstFactValue, setFirstFactValue] = useState(task.firstFactValue);
  const [secondFactValue, setSecondFactValue] = useState(task.secondFactValue);

  const debouncedFirstValue = useDebounce(firstFactValue, 400);
  const debouncedSecondValue = useDebounce(secondFactValue, 400);

  useEffect(() => {
    onSaveFirstValue(debouncedFirstValue);
  }, [debouncedFirstValue]);

  useEffect(() => {
    onSaveSecondValue(debouncedSecondValue);
  }, [debouncedSecondValue]);

  function TaskTime() {
    if (!task.startTime) return <></>;
    return (
      <TaskValuePreview title="Время" value={task.startTime.slice(0, 5)} />
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
        {isSpecialist && (
          <div className={s.half}>
            <div className={s.title}>
              Факт ({translatedFirstTargetType[task.firstTargetType]})
            </div>
            <div className={s.fakeInput}>{task.firstFactValue || 0}</div>
          </div>
        )}
        {!isSpecialist && (
          <div className={s.half}>
            <div className={s.input}>
              <p className={s.title}>Факт</p>
              <input
                placeholder="Факт"
                name="firstFactValue"
                value={firstFactValue}
                onChange={e => setFirstFactValue(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <div className={s.line}>
        <div className={s.half}>
          <div className={s.title}>
            План ({translatedSecondTargetType[task.secondTargetType]})
          </div>
          <div className={s.fakeInput}>{task.secondTargetValue}</div>
        </div>
        {isSpecialist && (
          <div className={s.half}>
            <div className={s.title}>
              Факт ({translatedSecondTargetType[task.secondTargetType]})
            </div>
            <div className={s.fakeInput}>{task.secondFactValue || 0}</div>
          </div>
        )}
        {!isSpecialist && (
          <div className={s.half}>
            <div className={s.input}>
              <p className={s.title}>Факт</p>
              <input
                placeholder="Факт"
                name="secondFactValue"
                value={secondFactValue}
                onChange={e => setSecondFactValue(e.target.value)}
              />
            </div>
          </div>
        )}
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
        <TaskPreviewComments
          comments={task.comments}
          onSend={onSendComment}
          isLoading={isCommentsLoading}
          onDeleteComment={onDeleteComment}
        />
      </div>
    </div>
  );
}
