import React from 'react';
import { Formik } from 'formik';
import Textarea from '../../Textarea/Textarea';
import { TaskPreviewComment } from '../PreviewComment/PreviewComment';
import { Comment } from '../../../@types/entities/Comment';

import sendIcon from './../../../assets/icons/Send.svg';

import s from './PreviewComments.module.scss';
import { Loader } from '../../../shared/Form/Loader/Loader';

export type TaskPreviewCommentsProps = {
  comments: Comment[];
  isLoading?: boolean;
  onSend(newCommentText: string): void;
};

export function TaskPreviewComments({
  isLoading,
  comments,
  onSend,
}: TaskPreviewCommentsProps) {
  return (
    <div className={s.taskPreviewComments}>
      <Formik
        initialValues={{ comment: '' }}
        onSubmit={values => {
          onSend(values.comment);
          values.comment = '';
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form className={s.addNewComment} onSubmit={handleSubmit}>
            <Textarea
              placeholder="Новый комментарий"
              name="comment"
              value={values.comment}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {values.comment.trim() && (
              <button className={s.inputButton} type="submit">
                <img src={sendIcon} alt="" />
              </button>
            )}
          </form>
        )}
      </Formik>

      <div className={s.commentsList}>
        {isLoading && <p className={s.loading}>Загрузка комментариев...</p>}
        {!isLoading && comments.length === 0 && <p>Нет комментариев</p>}
        {!isLoading &&
          comments.length !== 0 &&
          comments.map(comment => (
            <TaskPreviewComment key={comment.uuid} comment={comment} />
          ))}
      </div>
    </div>
  );
}
