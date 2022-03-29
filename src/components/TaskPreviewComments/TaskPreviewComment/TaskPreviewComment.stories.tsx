import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import {
  TaskPreviewComment,
  TaskPreviewCommentProps,
} from './TaskPreviewComment';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

export default {
  component: TaskPreviewComment,
  title: 'src/components/TaskPreviewComments/TaskPreviewComment',
} as Meta;

const Template: ComponentStory<typeof TaskPreviewComment> = (
  args: TaskPreviewCommentProps,
) => <TaskPreviewComment {...args} />;
export const DefaultTaskPreviewComment = Template.bind({});
const props: Partial<TaskPreviewCommentProps> = {
  comment: {
    uuid: generateUniqueID(),
    datetime: '24.01.2022', // ISO
    text: 'Эй, Дора, готова?',
    author: {
      lastname: 'Барулин',
      name: 'Михаил',
      profilePhoto:
        'https://images.unsplash.com/photo-1642978277577-83c6ceac4820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80', // Ссылка
    },
  },
};

DefaultTaskPreviewComment.args = props;
