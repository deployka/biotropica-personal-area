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
} from '../../../store/@types/Task';

export default {
  component: CompetitionTaskEditor,
  title: 'src/components/CompetitionTaskEditor',
} as Meta;

const task: CreateCompetitionTask = {
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
};

const Template: ComponentStory<typeof CompetitionTaskEditor> = (
  args: CompetitionTaskEditorProps,
) => <CompetitionTaskEditor {...args} />;
export const DefaultCompetitionTaskEditor = Template.bind({});
const props: Partial<CompetitionTaskEditorProps> = {
  task: task,
};

DefaultCompetitionTaskEditor.args = props;
