import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { TaskCalendar, TaskCalendarProps } from './TaskCalendar';
import { generateTask } from '../../helpers/generators/entityGenerator';

export default {
  component: TaskCalendar,
  title: 'src/components/TaskCalendar',
} as Meta;

const Template: ComponentStory<typeof TaskCalendar> = (
  args: TaskCalendarProps,
) => {
  const [currentMonth, setCurrentMonth] = useState('2022-01');
  function onChangeCurrentMonthHandler(newMonth: string) {
    setCurrentMonth(newMonth);
  }
  return (
    <TaskCalendar
      {...args}
      currentMonth={currentMonth}
      onChangeCurrentMonth={onChangeCurrentMonthHandler}
    />
  );
};
export const DefaultTaskCalendar = Template.bind({});
const props: Partial<TaskCalendarProps> = {
  tasks: [],
};

DefaultTaskCalendar.args = props;
