import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { SpecializationList, SpecializationListProps } from './List';
import { Specialization } from '../../../store/rtk/requests/specializations';

export default {
  component: SpecializationList,
  title: 'src/components/recommendations/SpecializationList',
} as Meta;

const specialization: Specialization = {
  id: 0,
  title: 'Test',
  key: '15',
};

const Template: ComponentStory<typeof SpecializationList> = (
  args: SpecializationListProps,
) => <SpecializationList {...args} />;
export const DefaultSpecializationList = Template.bind({});
const props: Partial<SpecializationListProps> = {
  types: [
    {
      specialization: specialization,
      count: 1,
    },
    {
      specialization: specialization,
      count: 2,
    },
    {
      specialization: specialization,
      count: 4,
    },
    {
      specialization: specialization,
      count: 5,
    },
    {
      specialization: specialization,
      count: 11,
    },
    {
      specialization: specialization,
      count: 21,
    },
    {
      specialization: specialization,
      count: 12,
    },
    {
      specialization: specialization,
      count: 58,
    },
    {
      specialization: specialization,
      count: 61,
    },
  ],
  selectedType: null,
};

DefaultSpecializationList.args = props;
