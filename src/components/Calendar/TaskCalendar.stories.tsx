import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { TaskCalendar, TaskCalendarProps } from './TaskCalendar';
import { generateTask } from '../../helpers/generators/entityGenerator';

export default {
  component: TaskCalendar,
  title: 'src/components/TaskCalendar',
} as Meta;

const Template: ComponentStory<typeof TaskCalendar> = (args: TaskCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState('2022-01');
  function onChangeCurrentMonthHandler(newMonth: string) {
    setCurrentMonth(newMonth);
  }
  return <TaskCalendar {...args} currentMonth={currentMonth} onChangeCurrentMonth={onChangeCurrentMonthHandler}/>;
};
export const DefaultTaskCalendar = Template.bind({});
const props: Partial<TaskCalendarProps> = {
  tasks: [
    generateTask({ date: '2022-01-01' }),
    generateTask({ date: '2022-01-01' }),
    generateTask({ date: '2022-01-02' }),
    generateTask({ date: '2022-01-03' }),
    generateTask({ date: '2022-01-03' }),
    generateTask({ date: '2022-01-03' }),
    generateTask({ date: '2022-01-04' }),
    generateTask({ date: '2022-01-05' }),
    generateTask({ date: '2022-01-06' }),
    generateTask({ date: '2022-01-06' }),
    generateTask({ date: '2022-01-06' }),
    generateTask({ date: '2022-01-07' }),
    generateTask({ date: '2022-01-08' }),
    generateTask({ date: '2022-01-09' }),
    generateTask({ date: '2022-01-10' }),
    generateTask({ date: '2022-01-10' }),
    generateTask({ date: '2022-01-10' }),
    generateTask({ date: '2022-01-11' }),
    generateTask({ date: '2022-01-12' }),
    generateTask({ date: '2022-01-13' }),
    generateTask({ date: '2022-01-14' }),
    generateTask({ date: '2022-01-15' }),
    generateTask({ date: '2022-01-16' }),
    generateTask({ date: '2022-01-17' }),
  ],
};

DefaultTaskCalendar.args = props;
