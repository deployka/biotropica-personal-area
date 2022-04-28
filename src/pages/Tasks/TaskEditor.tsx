import React, { RefObject } from 'react';
import {
  CreateCompetitionTask,
  CreateEventTask,
  CreateSomeTask,
  CreateTrainingTask,
} from '../../store/@types/Task';
import { CompetitionTaskEditor } from '../../components/CompetitionTaskEditor/CompetitionTaskEditor';
import { EventTaskEditor } from '../../components/EventTaskEditor/EventTaskEditor';
import { TrainingTaskEditor } from '../../components/TrainingTaskEditor/TrainingTaskEditor';
import { FormikProps } from 'formik';

type TaskEditorProps = {
  task: CreateSomeTask;
  isLoading: boolean;
  onSave(task: CreateSomeTask): void;
  onClose(): void;
  formikRef: RefObject<FormikProps<Partial<CreateSomeTask>>>;
};

export const TaskEditor = ({
  task,
  onSave,
  formikRef,
  isLoading,
  onClose,
}: TaskEditorProps) => {
  console.log('event');
  switch (task.type) {
    case 'training':
      return (
        <TrainingTaskEditor
          task={task}
          formikRef={
            formikRef as RefObject<FormikProps<Partial<CreateTrainingTask>>>
          }
          isLoading={isLoading}
          onSave={onSave}
          onClose={onClose}
        />
      );
    case 'event':
      return (
        <EventTaskEditor
          task={task}
          formikRef={
            formikRef as RefObject<FormikProps<Partial<CreateEventTask>>>
          }
          isLoading={isLoading}
          onSave={onSave}
          onClose={onClose}
        />
      );
    case 'competition':
      return (
        <CompetitionTaskEditor
          formikRef={
            formikRef as RefObject<FormikProps<Partial<CreateCompetitionTask>>>
          }
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
