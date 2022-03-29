import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { SpecializationItem, SpecializationItemProps } from './SpecializationItem';
import { Specialization } from '../../../store/rtk/requests/specializations';

export default {
  component: SpecializationItem,
  title: 'src/components/recommendations/RecommendationType',
} as Meta;

const specialization: Specialization = {
  id: 0,
  title: 'Test',
  key: '15',
};

const Template: ComponentStory<typeof SpecializationItem> = (args: SpecializationItemProps) =>
  <SpecializationItem {...args} />;
export const DefaultRecommendationType = Template.bind({});
export const SelectedRecommendationType = Template.bind({});
const props: Partial<SpecializationItemProps> = {
  type: {
    specialization: specialization,
    count: 5,
  },
};

DefaultRecommendationType.args = props;
SelectedRecommendationType.args = { ...props, selected: true };
