import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { CalendarDay, CalendarDayProps } from './Day';
import { generateTask } from '../../../helpers/generators/entityGenerator';

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
    isGrey: true,
    isPast: false,
    day: 15,
    tasks: [],
    isCurrentDay: true,
    nameOfDay: '',
  },
};

DefaultCalendarDay.args = props;
