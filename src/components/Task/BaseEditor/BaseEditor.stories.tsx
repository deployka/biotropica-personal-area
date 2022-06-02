import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { TaskBaseEditor, TaskBaseEditorProps } from './BaseEditor';

import {
  KindOfCompetitionSport,
  KindOfEvent,
  KindOfSport,
  RunCompetitionType,
  TaskPriority,
  TrainingCategory,
} from '../../../store/@types/Task';

export default {
  component: TaskBaseEditor,
  title: 'src/components/TaskEditor',
} as Meta;

const Template: ComponentStory<typeof TaskBaseEditor> = (
  args: TaskBaseEditorProps,
) => <TaskBaseEditor {...args} />;

export const Training = Template.bind({});
export const Competition = Template.bind({});
export const Event = Template.bind({});

const trainingProps: Partial<TaskBaseEditorProps> = {
  title: 'Бег',
  mode: 'view',
  task: {
    type: 'training',
    kindOfSport: KindOfSport.run,
    category: TrainingCategory.muscleEndurance,
    startTime: '',
    firstTargetType: 'time',
    firstTargetValue: 0,
    secondTargetType: 'pulse',
    secondTargetValue: 0,
    title: 'Название задачи',
    date: '2022-01-27',
    status: 'init',
    comments: [],
    executorId: 0,
  },
};

const competitionProps: Partial<TaskBaseEditorProps> = {
  title: 'Бег',
  mode: 'view',
  task: {
    type: 'competition',
    kindOfSport: KindOfCompetitionSport.run,
    competitionType: RunCompetitionType.marathon,
    priority: TaskPriority.A,
    startTime: '12:30',
    targetValue: 0,
    title: 'Test',
    date: '',
    status: 'init',
    comments: [],
    executorId: 0,
  },
};

const eventProps: Partial<TaskBaseEditorProps> = {
  title: 'Бег',
  mode: 'view',
  task: {
    type: 'event',
    repeatType: 'daily',
    completionType: 'byRepetitionsNumber',
    completionValue: '15',
    title: 'Прием таблеток',
    date: '2022-01-27',
    status: 'init',
    comments: [],
    kindOfEvent: KindOfEvent.restDay,
    executorId: 0,
  },
};

Training.args = trainingProps;
Competition.args = competitionProps;
Event.args = eventProps;
