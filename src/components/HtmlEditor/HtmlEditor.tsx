import React from 'react';

import ReactQuill from 'react-quill';
import { StringMap } from 'quill';

import 'react-quill/dist/quill.snow.css';

import s from './HtmlEditor.module.scss';
import { ErrorMessage } from '../../shared/Form/ErrorMessage/ErrorMessage';

export type HtmlEditorConfig = {
  modules?: StringMap;
  formats?: string[];
};

export type HtmlEditorProps = {
  value: string;
  config?: HtmlEditorConfig;
  onChange(value: string): void;
  error?: string;
};

export function HtmlEditor({
  value,
  config = {},
  error,
  onChange,
}: HtmlEditorProps) {
  config.formats ??= [];
  config.modules ??= [];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],

    ...config.modules,
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    ...config.formats,
  ];

  return (
    <div className={s.htmlEditorWrapper}>
      <ReactQuill
        defaultValue={value}
        onChange={onChange}
        formats={formats}
        modules={modules}
        theme="snow"
      ></ReactQuill>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
