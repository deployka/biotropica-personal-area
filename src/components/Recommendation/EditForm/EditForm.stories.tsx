import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { RecommendationEditForm } from './EditForm';

export default {
  component: RecommendationEditForm,
  title: 'src/components/recommendations/RecommendationEditor',
} as Meta;

const Template: ComponentStory<typeof RecommendationEditForm> = args => (
  <RecommendationEditForm {...args} />
);
export const DefaultRecommendationEditor = Template.bind({});
