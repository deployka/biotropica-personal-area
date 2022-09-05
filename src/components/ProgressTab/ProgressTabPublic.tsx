import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import type { Progress } from '../../@types/entities/Progress';

import { IInfoBar, InfoBar } from '../../shared/Global/InfoBar/InfoBar';
import { ProgressPost } from './ProgressPost/ProgressPost';
import { AddPhotoModal, Files } from './AddPhotoModal/AddPhotoModal';
import { PhotoSliderModal } from './PhotoSliderModal/PhotoSliderModal';
import { FormikHelpers } from 'formik';
import Button from '../Button/Button';

import s from './ProgressTab.module.scss';

type Props = {
  isLoading?: boolean;
  progressPosts: Progress[];
};

const infoBar: IInfoBar = {
  title: 'У пользователя нет загруженного прогресса',
};

export const ProgressTabPublic = ({ progressPosts, isLoading }: Props) => {
  const [openedPost, setOpenedPost] = useState<{
    post: Progress;
    index: number;
  } | null>(null);

  const handleClickPhoto = (post: Progress, index: number) => {
    setOpenedPost({
      post,
      index,
    });
  };

  if (isLoading) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <PerfectScrollbar>
      {!progressPosts.length && <InfoBar infoBar={infoBar} />}
      {!!progressPosts.length && (
        <div className={s.progress}>
          {progressPosts.map(post => (
            <ProgressPost
              key={post.id}
              post={post}
              onClickPhoto={handleClickPhoto}
            />
          ))}
        </div>
      )}
      <PhotoSliderModal
        isOpened={!!openedPost}
        photos={openedPost?.post.photos || []}
        openedPhotoIndex={openedPost?.index}
        createdAt={openedPost?.post?.createdAt}
        onClose={() => setOpenedPost(null)}
      />
    </PerfectScrollbar>
  );
};
