import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { EventTaskPreview, EventTaskPreviewProps } from './Event';
import { EventTask, KindOfEvent } from '../../../@types/entities/Task';

export default {
  component: EventTaskPreview,
  title: 'src/components/EventTaskPreview',
} as Meta;

const task: EventTask = {
  type: 'event',
  authorId: 0,
  isPrivate: true,
  repeatType: 'daily',
  completionType: 'byDate',
  title: 'Проверка',
  date: '27.01.2022',
  status: 'init',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur exercitationem repellat quos ut doloribus culpa ipsa laboriosam, a laudantium sint quis, dolorem error voluptas cumque odio voluptatem quae autem provident!',
  completionValue: '5',
  comments: [],
  id: 'feqfqwfqwfwf',
  kindOfEvent: KindOfEvent.restDay,
  executorId: 0,
};

const Template: ComponentStory<typeof EventTaskPreview> = (
  args: EventTaskPreviewProps,
) => <EventTaskPreview {...args} />;
export const DefaultEventTaskView = Template.bind({});
const props: Partial<EventTaskPreviewProps> = {
  task: task,
};

DefaultEventTaskView.args = props;
