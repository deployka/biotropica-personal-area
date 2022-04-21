import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { HtmlEditor, HtmlEditorProps } from './HtmlEditor';

export default {
  component: HtmlEditor,
  title: 'src/components/HtmlEditor',
} as Meta;

const Template: ComponentStory<typeof HtmlEditor> = (args: HtmlEditorProps) => <HtmlEditor {...args}/>;

export const DefaultHtmlEditor = Template.bind({});
const props: Partial<HtmlEditorProps> = {
  config: {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link'],
        ['clean'],
      ],
    },
    formats: [],
  },
};

DefaultHtmlEditor.args = props;
