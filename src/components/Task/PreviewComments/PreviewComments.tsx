import React from 'react';
import { Formik } from 'formik';
import Textarea from '../../Textarea/Textarea';
import { TaskPreviewComment } from '../PreviewComment/PreviewComment';
import { Comment } from '../../../@types/entities/Comment';

import sendIcon from './../../../assets/icons/Send.svg';

import s from './PreviewComments.module.scss';
import { Loader } from '../../../shared/Form/Loader/Loader';
import { TaskStatus } from '../../../@types/entities/Task';
import { useGetTaskCommentsQuery } from '../../../api/tasks';

export type TaskPreviewCommentsProps = {
  taskId: string | null,
  comments?: Comment[];
  isDoneButtonClick?: boolean;
  onSend(newCommentText: string): void;
  onDeleteComment(commentId: string): void;
};

export function TaskPreviewComments({
  taskId,
  onSend,
  onDeleteComment,
  isDoneButtonClick,
}: TaskPreviewCommentsProps) {
  const { data: comments = [], isFetching: isCommentsLoading } = useGetTaskCommentsQuery(
    { taskId: taskId || '' },
    {
      skip: !taskId,
    },
  );

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
        {isCommentsLoading && <div className={s.indicator} ><Loader color={'#3b82f6'} /></div>}
        {!isCommentsLoading &&
          comments.length !== 0 &&
          comments.map(comment => (
            <TaskPreviewComment key={comment.uuid} comment={comment} onDeleteComment={onDeleteComment} />
          ))}
      </div>
    </div>
  );
}
