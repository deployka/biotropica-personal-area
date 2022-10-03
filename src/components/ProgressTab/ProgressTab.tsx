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
  isAccess?: boolean;
  isLoading: boolean;
  progressPosts: Progress[];
  onCreatePost: (value: Files, options: FormikHelpers<Files>) => void;
  onDeletePost: (id: number) => void;
};

export const ProgressTab = ({
  progressPosts,
  isLoading,
  isAccess = false,
  onCreatePost,
  onDeletePost,
}: Props) => {
  const [openedPost, setOpenedPost] = useState<{
    post: Progress;
    index: number;
  } | null>(null);

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const infoBar: IInfoBar = {
    title: 'У вас нет загруженного прогресса',
    text: 'Вы еще не загрузили фото прогресса. Сделайте это нажав на ссылку ниже',
    bottomLink: 'Загрузить фото',
    onBottomClick: () => {
      setIsCreatePostModalOpen(true);
    },
  };

  const handleClickPhoto = (post: Progress, index: number) => {
    setOpenedPost({
      post,
      index,
    });
  };

  if (!isAccess) return <p>Нет доступа</p>;

  if (isLoading) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <PerfectScrollbar>
      <Button
        onClick={() => setIsCreatePostModalOpen(true)}
        className={s.addPhotoBtn}
        isPrimary
      >
        Добавить фото
      </Button>
      {!progressPosts.length && <InfoBar infoBar={infoBar} />}
      {!!progressPosts.length && (
        <div className={s.progress}>
          {progressPosts.map(post => (
            <ProgressPost
              key={post.id}
              post={post}
              isDeletable={true}
              onClickPhoto={handleClickPhoto}
              onDelete={() => onDeletePost(post.id)}
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
      <AddPhotoModal
        isOpened={isCreatePostModalOpen}
        onSubmit={onCreatePost}
        onClose={() => setIsCreatePostModalOpen(false)}
      />
    </PerfectScrollbar>
  );
};
