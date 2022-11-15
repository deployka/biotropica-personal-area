import React from 'react';
import { SomeTask } from '../../@types/entities/Task';

import { CompetitionTaskPreview } from './Competition/Competition';
import { EventTaskPreview } from './Event/Event';
import { TrainingTaskPreview } from './Training/Training';

type TaskPreviewProps = {
  task: SomeTask;
  isSpecialist: boolean;
  isCommentsLoading?: boolean;
  onSendComment(newCommentText: string): void;
  onSaveFactValue(value: string | undefined): void;
  onSaveFirstValue(value: string | undefined): void;
  onSaveSecondValue(value: string | undefined): void;
};

export const TaskPreview = ({
  task,
  isSpecialist,
  isCommentsLoading,
  onSendComment,
  onSaveFactValue,
  onSaveFirstValue,
  onSaveSecondValue,
}: TaskPreviewProps) => {
  switch (task.type) {
    case 'training':
      return (
        <TrainingTaskPreview
          isSpecialist={isSpecialist}
          task={task}
          onSaveFirstValue={onSaveFirstValue}
          onSaveSecondValue={onSaveSecondValue}
          isCommentsLoading={isCommentsLoading}
          onSendComment={onSendComment}
        />
      );
    case 'event':
      return <EventTaskPreview task={task} onSendComment={onSendComment} />;
    case 'competition':
      return (
        <CompetitionTaskPreview
          isSpecialist={isSpecialist}
          task={task}
          onSaveFactValue={onSaveFactValue}
          onSendComment={onSendComment}
        />
      );
    default:
      return <></>;
  }
};
