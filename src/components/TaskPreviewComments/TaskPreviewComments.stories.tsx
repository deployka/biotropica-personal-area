import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import {
  TaskPreviewComments,
  TaskPreviewCommentsProps,
} from './TaskPreviewComments';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

export default {
  component: TaskPreviewComments,
  title: 'src/components/TaskPreviewComments',
} as Meta;

const Template: ComponentStory<typeof TaskPreviewComments> = (
  args: TaskPreviewCommentsProps,
) => <TaskPreviewComments {...args} />;
export const DefaultTaskPreviewComments = Template.bind({});
const props: Partial<TaskPreviewCommentsProps> = {
  comments: [
    {
      uuid: generateUniqueID(),
      datetime: '24.01.2022', // ISO
      text: 'Эй, Дора, готова?',
      author: {
        lastname: 'Барулин',
        name: 'Михаил',
        profile_photo:
          'https://images.unsplash.com/photo-1642978277577-83c6ceac4820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80', // Ссылка
      },
    },
    {
      uuid: generateUniqueID(),
      datetime: '24.01.2022', // ISO
      text: 'ДА!',
      author: {
        lastname: 'Самарин',
        name: 'Иван',
        profile_photo:
          'https://images.unsplash.com/photo-1642622928474-c0ac98fccd29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', // Ссылка
      },
    },
    {
      uuid: generateUniqueID(),
      datetime: '24.01.2022', // ISO
      text: 'В моих глазах долар!',
      author: {
        lastname: 'Барулин',
        name: 'Михаил',
        profile_photo:
          'https://images.unsplash.com/photo-1642978277577-83c6ceac4820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80', // Ссылка
      },
    },
    {
      uuid: generateUniqueID(),
      datetime: '24.01.2022', // ISO
      text: 'БАКС!',
      author: {
        lastname: 'Самарин',
        name: 'Иван',
        profile_photo:
          'https://images.unsplash.com/photo-1642622928474-c0ac98fccd29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', // Ссылка
      },
    },
  ],
};

DefaultTaskPreviewComments.args = props;
