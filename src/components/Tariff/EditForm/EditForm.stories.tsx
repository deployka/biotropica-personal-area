import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { TariffEditForm } from './EditForm';

export default {
  component: TariffEditForm,
  title: 'src/components/tariff/Editor',
} as Meta;

const Template: ComponentStory<typeof TariffEditForm> = args => (
  <TariffEditForm {...args} />
);
export const DefaultTariffEditor = Template.bind({});
const props = {
  onClose: () => console.log('onClose'),
  onSubmit: () => console.log('onSubmit'),
  onDelete: () => console.log('onDelete'),
};

DefaultTariffEditor.args = props;
