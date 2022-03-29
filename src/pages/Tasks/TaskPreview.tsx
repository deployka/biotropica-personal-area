import React from 'react';
import { SomeTask } from '../../store/@types/Task';
import { CompetitionTaskPreview } from '../../components/CompetitionTaskPreview/CompetitionTaskPreview';

import { EventTaskPreview } from '../../components/EventTaskPreview/EventTaskPreview';

import { TrainingTaskPreview } from '../../components/TrainingTaskPreview/TrainingTaskPreview';

type TaskPreviewProps = {
  task: SomeTask,
  onSendComment(newCommentText: string): void;
  onSaveFactValue(value: number | undefined): void;
  onSaveFirstValue(value: number | undefined): void;
  onSaveSecondValue(value: number | undefined): void;
};

export const TaskPreview = ({
  task,
  onSendComment,
  onSaveFactValue,
  onSaveFirstValue,
  onSaveSecondValue,
}: TaskPreviewProps) => {
  switch (task.type) {
    case 'training':
      return (
        <TrainingTaskPreview
          task={task}
          onSaveFirstValue={onSaveFirstValue}
          onSaveSecondValue={onSaveSecondValue}
          onSendComment={onSendComment}
        />
      );
    case 'event':
      return <EventTaskPreview task={task} onSendComment={onSendComment} />;
    case 'competition':
      return (
        <CompetitionTaskPreview
          task={task}
          onSaveFactValue={onSaveFactValue}
          onSendComment={onSendComment}
        />
      );
    default:
      return <></>;
  }
};
