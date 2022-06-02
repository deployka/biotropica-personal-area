import React from 'react';
import { Formik } from 'formik';
import Textarea from '../../Textarea/Textarea';
import { TaskPreviewComment } from '../PreviewComment/PreviewComment';

import sendIcon from './../../../assets/icons/Send.svg';

import s from './PreviewComments.module.scss';

export type TaskPreviewCommentsProps = {
  comments: TaskComment[];
  onSend(newCommentText: string): void;
};

export function TaskPreviewComments({
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
        {comments.map(comment => (
          <TaskPreviewComment key={comment.uuid} comment={comment} />
        ))}
      </div>
    </div>
  );
}
