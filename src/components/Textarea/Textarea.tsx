import React, { useRef } from 'react';
import { useField } from 'formik';
import classNames from 'classnames';

import s from './Textarea.module.scss';

import Label from '../../components/Label/Label';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  name: string;
  value: string;
  classes?: string;
  placeholder?: string;
  label?: string;
  autoComplete?: string;
  maxRows?: number;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onInput?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Textarea = (props: Props) => {
  const {
    value,
    classes,
    placeholder,
    label,
    maxRows,
  } = props;

  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;
  const textarea = useRef(null);

  return (
    <>
      <TextareaAutosize
        ref={textarea}
        className={classNames({
          [s.textarea]: true,
          [s.active]: !!value,
          [s.success__textarea]: meta.touched && field.value && !isError,
          [s.error__textarea]: isError,
        }, classes)}
        {...field}
        {...props}
        maxRows={maxRows || 7}
        placeholder={placeholder}
      />
      {label && <Label value={label} />}
      {
        meta.touched &&
        meta.error && (
          <ErrorMessage message={meta.error} />
        )
      }
    </>
  );
};

export default Textarea;
