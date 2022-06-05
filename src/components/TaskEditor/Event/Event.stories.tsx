import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { EventTaskEditor, EventTaskEditorProps } from './Event';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import { EventTask, KindOfEvent } from '../../../store/@types/Task';

export default {
  component: EventTaskEditor,
  title: 'src/components/EventTaskEditor',
} as Meta;

const task: EventTask = {
  id: generateUniqueID(),
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
};

const Template: ComponentStory<typeof EventTaskEditor> = (
  args: EventTaskEditorProps,
) => <EventTaskEditor {...args} />;
export const DefaultEventTaskEditor = Template.bind({});
const props: Partial<EventTaskEditorProps> = {
  task: task,
};

DefaultEventTaskEditor.args = props;
