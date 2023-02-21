import React from 'react';
import { Formik } from 'formik';
import Textarea from '../../Textarea/Textarea';
import { TaskPreviewComment } from '../PreviewComment/PreviewComment';
import { Comment } from '../../../@types/entities/Comment';

import sendIcon from './../../../assets/icons/Send.svg';

import s from './PreviewComments.module.scss';
import { Loader } from '../../../shared/Form/Loader/Loader';
import { TaskStatus } from '../../../@types/entities/Task';

export type TaskPreviewCommentsProps = {
  comments: Comment[];
  isLoading?: boolean;
  isDoneButtonClick?: boolean;
  onSend(newCommentText: string): void;
  onDeleteComment(commentId: string): void;
};

export function TaskPreviewComments({
  isLoading,
  comments,
  onSend,
  onDeleteComment,
  isDoneButtonClick,
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
              isDoneButtonClick={isDoneButtonClick}
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
        {!isLoading &&
          comments.length !== 0 &&
          comments.map(comment => (
            <TaskPreviewComment key={comment.uuid} comment={comment} onDeleteComment={onDeleteComment} />
          ))}
      </div>
    </div>
  );
}
