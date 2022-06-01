import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { RecommendationEditor, RecommendationEditorProps } from './Editor';

export default {
  component: RecommendationEditor,
  title: 'src/components/recommendations/RecommendationEditor',
} as Meta;

const Template: ComponentStory<typeof RecommendationEditor> = (
  args: RecommendationEditorProps,
) => <RecommendationEditor {...args} />;
export const DefaultRecommendationEditor = Template.bind({});
const props: Partial<RecommendationEditorProps> = {};

DefaultRecommendationEditor.args = props;
