import React from 'react';
import { CreateSomeTask } from '../../store/@types/Task';
import { CompetitionTaskEditor } from '../../components/CompetitionTaskEditor/CompetitionTaskEditor';
import { EventTaskEditor } from '../../components/EventTaskEditor/EventTaskEditor';
import { TrainingTaskEditor } from '../../components/TrainingTaskEditor/TrainingTaskEditor';

type TaskEditorProps = {
  task: CreateSomeTask;
  isLoading: boolean;
  onSave(task: CreateSomeTask): void;
  onClose(): void;
};

export const TaskEditor = ({
  task,
  onSave,
  isLoading,
  onClose,
}: TaskEditorProps) => {
  switch (task.type) {
    case 'training':
      return (
        <TrainingTaskEditor
          task={task}
          isLoading={isLoading}
          onSave={onSave}
          onClose={onClose}
        />
      );
    case 'event':
      return (
        <EventTaskEditor
          task={task}
          isLoading={isLoading}
          onSave={onSave}
          onClose={onClose}
        />
      );
    case 'competition':
      return (
        <CompetitionTaskEditor
          isLoading={isLoading}
          task={task}
          onSave={onSave}
          onClose={onClose}
        />
      );
    default:
      return <></>;
  }
};
