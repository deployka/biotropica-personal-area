import React from 'react';

import ReactQuill from 'react-quill';
import { StringMap } from 'quill';

import 'react-quill/dist/quill.snow.css';

import s from './HtmlEditor.module.scss';

export type HtmlEditorConfig = {
  modules?: StringMap;
  formats: string[];
};

export type HtmlEditorProps = {
  value: string;
  onChange(value: string): void;
  config: HtmlEditorConfig; // тут должна быть возможность кастомизации редактора
};

export function HtmlEditor({ value, onChange, config }: HtmlEditorProps) {
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

    ...config?.modules,
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
    </div>
  );
}
