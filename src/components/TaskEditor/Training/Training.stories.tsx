import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { TrainingTaskEditor, TrainingTaskEditorProps } from './Training';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import {
  KindOfSport,
  TrainingCategory,
  TrainingTask,
} from '../../../@types/entities/Task';

export default {
  component: TrainingTaskEditor,
  title: 'src/components/TrainingTaskEditor',
} as Meta;

const task: TrainingTask = {
  id: generateUniqueID(),
  type: 'training',
  authorId: 0,
  isPrivate: true,
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
  comments: [],
  executorId: 0,
};

const Template: ComponentStory<typeof TrainingTaskEditor> = (
  args: TrainingTaskEditorProps,
) => <TrainingTaskEditor {...args} />;
export const DefaultTrainingTaskEditor = Template.bind({});
const props: Partial<TrainingTaskEditorProps> = {
  task: task,
};

DefaultTrainingTaskEditor.args = props;
