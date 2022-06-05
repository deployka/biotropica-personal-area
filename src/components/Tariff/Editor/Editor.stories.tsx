import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { TariffEditor, TariffEditorProps } from './Editor';

export default {
  component: TariffEditor,
  title: 'src/components/tariff/Editor',
} as Meta;

const Template: ComponentStory<typeof TariffEditor> = (
  args: TariffEditorProps,
) => <TariffEditor {...args} />;
export const DefaultTariffEditor = Template.bind({});
const props: Partial<TariffEditorProps> = {
  cost: 15999,
  title: 'Базовый пакет',
  includedFields: [
    'Интерпретация результатов анализов',
    'Рекомендации тренера',
    'Рекомендации диетолога',
  ],
  onClose: () => console.log('onClose'),
  onSave: tariff => console.log(tariff),
  onRemove: () => console.log('onRemove'),
};

DefaultTariffEditor.args = props;
