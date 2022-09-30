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
  tariff: {
    id: 1,
    createdAt: '',
    updatedAt: '',
    cost: 100,
    order: 1,
    zakazSystemId: 'string',
    title: 'card',
    description: 'string',
    access: [],
    includedFields: [],
  },
};

DefaultTariffEditor.args = props;
