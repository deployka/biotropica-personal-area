import React, { ChangeEvent, FormEvent, useState } from 'react';
import { GlobalSvgSelector } from '../../../../../assets/icons/global/GlobalSvgSelector';
import { Loader } from '../../../../../shared/Form/Loader/Loader';
import ErrorMessage from '../../../../ErrorMessage/ErrorMessage';

import s from './AnalyzesCard.module.scss';

interface Props {
  onSubmit(comment: string, analyzeId: number): void;
  analyzeId: number;
  isLoading: boolean;
}

const MAX_COMMENT_LENGTH = 400;

export const AddCommentForm = ({ onSubmit, analyzeId, isLoading }: Props) => {
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState({
    empty: '',
    length: '',
  });

  const errorMessages = {
    empty: 'Введите текст комментария',
    length: `Максимальная длина комментария ${MAX_COMMENT_LENGTH} символов`,
  };

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const comment = e.target.value;
    const isMax = comment.length > MAX_COMMENT_LENGTH;
    setErrors(() => ({
      empty: !comment ? errorMessages.empty : '',
      length: isMax ? errorMessages.length : '',
    }));
    setValue(comment);
  }

  function getError() {
    return Object.entries(errors).find(([_, v]) => v)?.[1] || '';
  }

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(p => ({
      ...p,
      empty: !value ? errorMessages.empty : '',
    }));
    if (getError() || !value) return;
    onSubmit(value, analyzeId);
    setValue('');
  }

  return (
    <form onSubmit={submitHandler} className={s.addCommentForm}>
      <div className={s.inputWrapper}>
        <input
          placeholder="Введите комментарий"
          value={value}
          onChange={onChange}
        />
        <button className={s.addCommentBtn} type="submit">
          {isLoading ? (
            <Loader color="#9895a7" />
          ) : (
            <GlobalSvgSelector id="send" />
          )}
        </button>
      </div>
      <ErrorMessage message={getError()} />
    </form>
  );
};
