import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { Tabs, TabsProps } from './Tabs';

export default {
  component: Tabs,
  title: 'src/components/Tabs',
} as Meta;

const Template: ComponentStory<typeof Tabs> = (args: TabsProps<string>) => (
  <Tabs {...args} />
);
export const DefaultTabs = Template.bind({});
const props: Partial<TabsProps<string>> = {};

DefaultTabs.args = props;
