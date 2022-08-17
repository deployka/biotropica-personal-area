import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { TariffAddForm } from './AddForm';

export default {
  component: TariffAddForm,
  title: 'src/components/tariff/Editor',
} as Meta;

const Template: ComponentStory<typeof TariffAddForm> = args => (
  <TariffAddForm {...args} />
);
export const DefaultTariffEditor = Template.bind({});
