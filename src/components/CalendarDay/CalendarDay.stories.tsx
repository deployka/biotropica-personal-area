import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { CalendarDay, CalendarDayProps } from './CalendarDay';
import { generateTask } from '../../helpers/generators/entityGenerator';

export default {
  component: CalendarDay,
  title: 'src/components/CalendarDay',
} as Meta;

const Template: ComponentStory<typeof CalendarDay> = (
  args: CalendarDayProps,
) => <CalendarDay {...args} />;
export const DefaultCalendarDay = Template.bind({});
const props: Partial<CalendarDayProps> = {
  calendarDay: {
    day: 15,
    tasks: [
      generateTask({
        startTime: '12:00',
        endTime: '13:00',
        type: 'training',
        date: '2022-01-01',
        title: 'Задача 1',
        status: 'completed',
        comments: [],
      }),
      generateTask({
        startTime: '13:00',
        endTime: '14:00',
        type: 'event',
        date: '2022-01-01',
        title: 'Задача 2',
        status: 'failed',
        comments: [],
      }),
      generateTask({
        startTime: '14:00',
        endTime: '15:00',
        type: 'competition',
        date: '2022-01-01',
        title: 'Задача 3',
        status: 'nearly',
        comments: [],
      }),
      generateTask({
        startTime: '15:00',
        endTime: '16:00',
        type: 'training',
        date: '2022-01-01',
        title: 'Задача 4',
        status: 'init',
        comments: [],
      }),
      generateTask({
        startTime: '16:00',
        type: 'event',
        date: '2022-01-01',
        title: 'Задача только с начальным временем',
        status: 'init',
        comments: [],
      }),
      generateTask({
        type: 'competition',
        date: '2022-01-01',
        title: 'Задача без времени',
        status: 'init',
        comments: [],
      }),
    ],
    isCurrentDay: true,
  },
};

DefaultCalendarDay.args = props;
