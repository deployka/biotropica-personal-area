import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import {
  CompetitionTaskEditor,
  CompetitionTaskEditorProps,
} from './Competition';
import {
  CreateCompetitionTask,
  KindOfCompetitionSport,
  RunCompetitionType,
  TaskPriority,
} from '../../../@types/entities/Task';

export default {
  component: CompetitionTaskEditor,
  title: 'src/components/CompetitionTaskEditor',
} as Meta;

const task: CreateCompetitionTask = {
  type: 'competition',
  authorId: 0,
  kindOfSport: KindOfCompetitionSport.run,
  competitionType: RunCompetitionType.marathon,
  priority: TaskPriority.A,
  startTime: '12:30',
  isPrivate: true,
  targetValue: 0,
  title: 'Test',
  date: '',
  status: 'init',
  comments: [],
  isVisible: true,
  executorId: 0,
};

const Template: ComponentStory<typeof CompetitionTaskEditor> = (
  args: CompetitionTaskEditorProps,
) => <CompetitionTaskEditor {...args} />;
export const DefaultCompetitionTaskEditor = Template.bind({});
const props: Partial<CompetitionTaskEditorProps> = {
  task: task,
};

DefaultCompetitionTaskEditor.args = props;
