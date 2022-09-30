import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { TrainingTaskPreview, TrainingTaskPreviewProps } from './Training';
import {
  KindOfSport,
  TrainingCategory,
  TrainingTask,
} from '../../../@types/entities/Task';

export default {
  component: TrainingTaskPreview,
  title: 'src/components/TrainingTaskPreview',
} as Meta;

const task: TrainingTask = {
  type: 'training',
  isPrivate: true,
  authorId: 0,
  kindOfSport: KindOfSport.run,
  category: TrainingCategory.aerobicEndurance,
  firstTargetType: 'time',
  firstTargetValue: 30,
  secondTargetType: 'pulse',
  secondTargetValue: 80,
  title: '',
  date: '2022-01-27',
  status: 'init',
  comments: [],
  description:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum quae omnis, ab sed cumque fugit suscipit eligendi, quam, fuga sint ratione praesentium doloribus saepe. Temporibus corrupti architecto ea perferendis ratione.',
  id: '213123',
  executorId: 0,
};

const Template: ComponentStory<typeof TrainingTaskPreview> = (
  args: TrainingTaskPreviewProps,
) => <TrainingTaskPreview {...args} />;
export const DefaultTrainingTaskPreview = Template.bind({});
const props: Partial<TrainingTaskPreviewProps> = {
  task: task,
};

DefaultTrainingTaskPreview.args = props;
