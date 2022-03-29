import React from 'react';
import {
  CreateSomeTask,
} from '../../store/@types/Task';
import { CompetitionTaskEditor } from '../../components/CompetitionTaskEditor/CompetitionTaskEditor';
import { EventTaskEditor } from '../../components/EventTaskEditor/EventTaskEditor';
import { TrainingTaskEditor } from '../../components/TrainingTaskEditor/TrainingTaskEditor';

type TaskEditorProps = {
  task: CreateSomeTask
  onSave(
    task: CreateSomeTask
  ): void;
  onClose(): void;
  onDelete(): void;
};

export const TaskEditor = ({
  task,
  onSave,
  onClose,
  onDelete,
}: TaskEditorProps) => {
  switch (task.type) {
    case 'training':
      return (
        <TrainingTaskEditor
          task={task}
          onSave={onSave}
          onClose={onClose}
          onDelete={onDelete}
        />
      );
    case 'event':
      return (
        <EventTaskEditor
          task={task}
          onSave={onSave}
          onClose={onClose}
          onDelete={onDelete}
        />
      );
    case 'competition':
      return (
        <CompetitionTaskEditor
          task={task}
          onSave={onSave}
          onClose={onClose}
          onDelete={onDelete}
        />
      );
    default:
      return <></>;
  }
};
