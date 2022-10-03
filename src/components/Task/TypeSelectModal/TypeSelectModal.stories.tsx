import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import {
  TaskTypeSelectModal,
  TaskTypeSelectModalProps,
} from './TypeSelectModal';

export default {
  component: TaskTypeSelectModal,
  title: 'src/components/TaskTypeSelectModal',
} as Meta;

const Template: ComponentStory<typeof TaskTypeSelectModal> = (
  args: TaskTypeSelectModalProps,
) => <TaskTypeSelectModal {...args} />;
export const DefaultTaskTypeSelectModal = Template.bind({});
const props: Partial<TaskTypeSelectModalProps> = {};

DefaultTaskTypeSelectModal.args = props;
