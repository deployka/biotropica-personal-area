import React from 'react';

import { intlFormat } from 'date-fns';
import { TaskPreviewComments } from '../../Task/PreviewComments/PreviewComments';
import { TaskValuePreview } from '../../Task/ValuePreview/ValuePreview';
import { EventTask } from '../../../@types/entities/Task';

import s from './Event.module.scss';

export interface EventTaskPreviewProps {
  task: EventTask;
  isCommentsLoading?: boolean;
  onSendComment(ewCommentText: string): void;
  onDeleteComment(commentId: string): void;
}

export const EventTaskPreview = ({
  task,
  isCommentsLoading,
  onSendComment,
  onDeleteComment,
}: EventTaskPreviewProps) => {
  const formatDate = intlFormat(new Date(task.date), {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <div className={s.eventTaskView}>
      <div className={s.line}>
        <TaskValuePreview title={'Название'} value={task.title} />
      </div>
      <div className={s.line}>
        <TaskValuePreview title={'Дата'} value={formatDate} />
      </div>
      {task.description && (
        <div className={s.line}>
          <div className={s.title}>Установка тренера</div>
          <div
            className={s.text}
            dangerouslySetInnerHTML={{ __html: task.description }}
          ></div>
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
};
