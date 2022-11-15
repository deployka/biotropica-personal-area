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
} from '../../../@types/entities/Task';

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
    authorName: '',
    authorId: 0,
    kindOfSport: KindOfSport.run,
    category: TrainingCategory.muscleEndurance,
    startTime: '',
    firstTargetType: 'time',
    firstTargetValue: '',
    secondTargetType: 'pulse',
    secondTargetValue: '',
    title: 'Название задачи',
    date: '2022-01-27',
    status: 'init',
    isVisible: true,
    isPrivate: true,
    comments: [],
    executorId: 0,
  },
};

const competitionProps: Partial<TaskBaseEditorProps> = {
  title: 'Бег',
  mode: 'view',
  task: {
    authorId: 0,
    type: 'competition',
    authorName: '',
    kindOfSport: KindOfCompetitionSport.run,
    competitionType: RunCompetitionType.marathon,
    priority: TaskPriority.A,
    startTime: '12:30',
    targetValue: '',
    title: 'Test',
    isPrivate: true,
    date: '',
    isVisible: true,
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
    authorName: '',
    isPrivate: true,
    authorId: 0,
    repeatType: 'daily',
    completionType: 'byRepetitionsNumber',
    completionValue: '15',
    title: 'Прием таблеток',
    date: '2022-01-27',
    status: 'init',
    isVisible: true,
    comments: [],
    kindOfEvent: KindOfEvent.restDay,
    executorId: 0,
  },
};

Training.args = trainingProps;
Competition.args = competitionProps;
Event.args = eventProps;
