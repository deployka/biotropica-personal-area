import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import {
  CompetitionTaskPreview,
  CompetitionTaskPreviewProps,
} from './Competition';
import {
  CompetitionTask,
  KindOfCompetitionSport,
  RunCompetitionType,
  TaskPriority,
} from '../../../@types/entities/Task';

export default {
  component: CompetitionTaskPreview,
  title: 'src/components/CompetitionTaskView',
} as Meta;

const task: CompetitionTask = {
  id: '1',
  authorId: 0,
  isPrivate: true,
  type: 'competition',
  kindOfSport: KindOfCompetitionSport.run,
  competitionType: RunCompetitionType.tenKm,
  priority: TaskPriority.A,
  startTime: '',
  targetValue: '',
  title: 'test',
  date: '01.02.2022',
  status: 'init',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa repellat repellendus quisquam qui. Pariatur, harum autem nostrum porro aut modi provident consectetur soluta velit iure? Officia minus velit deleniti distinctio!',
  comments: [],
  executorId: 0,
};

const Template: ComponentStory<typeof CompetitionTaskPreview> = (
  args: CompetitionTaskPreviewProps,
) => <CompetitionTaskPreview {...args} />;
export const DefaultTaskPreview = Template.bind({});
const props: Partial<CompetitionTaskPreviewProps> = {
  task: task,
};

DefaultTaskPreview.args = props;
