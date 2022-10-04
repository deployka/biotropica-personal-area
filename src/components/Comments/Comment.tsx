import React from 'react';
import { Comment as CommentType } from '../../@types/entities/Comment';
import s from './Comments.module.scss';
import defaultAvatar from '../../assets/images/profile/default_avatar.png';
import moment from 'moment';
import { getFullName } from '../../utils/getFullName';
import { getMediaLink } from '../../utils/mediaHelper';
import { GlobalSvgSelector } from '../../assets/icons/global/GlobalSvgSelector';
import { NotificationButtons } from './NotificationButtons';
import { eventBus, EventTypes } from '../../services/EventBus';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { useHistory } from 'react-router';
import { Specialization } from '../../@types/entities/Specialization';
import { BaseUser } from '../../@types/entities/BaseUser';
import { getUserRolesList } from '../../utils/getUserRolesList';
import { ROLE } from '../../@types/entities/Role';
import classNames from 'classnames';

type Props = {
  comment: CommentType;
  withTrash?: boolean;
  currentUserId?: BaseUser['id'];
  id?: number;
  author: BaseUser;
  onDelete?: (id: number) => void;
};

export function Comment({
  comment,
  withTrash = false,
  id,
  currentUserId = 0,
  author,
  onDelete,
}: Props) {
  const { createdAt, text } = comment;

  const { name, lastname, profilePhoto } = author;

  const authorSpecialistId = author?.specialist?.id;
  const authorSpecializations = author?.specialist?.specializations || [];
  const isAuthorAdmin = getUserRolesList(author).includes(ROLE.ADMIN);
  const isAuthorSpecialist = getUserRolesList(author).includes(ROLE.SPECIALIST);

  const isUserMovable = !isAuthorAdmin && !(currentUserId === author.id);

  const fullName = getFullName(name, lastname);
  const avatar = profilePhoto ? getMediaLink(profilePhoto) : defaultAvatar;
  const currentDate = moment(createdAt).format('DD.MM.YYYY');
  const history = useHistory();

  function onDiscard() {
    eventBus.emit(EventTypes.removeNotification, 'remove-comment-notification');
  }

  function onConfirm() {
    onDelete && id && onDelete(id);
  }

  function showDeleteConfirmation() {
    eventBus.emit(EventTypes.notification, {
      title: 'Удалить комментарий?',
      message: (
        <NotificationButtons onDiscard={onDiscard} onConfirm={onConfirm} />
      ),
      theme: 'dark',
      autoClose: false,
      type: NotificationType.INFO,
      toastId: 'remove-comment-notification',
    });
  }

  function handleDelete() {
    showDeleteConfirmation();
  }

  function moveToAuthor() {
    if (!isUserMovable) return;
    if (!isAuthorSpecialist || !authorSpecialistId) return;
    return history.push(`/specialists/${authorSpecialistId}`);
  }

  // TODO: вынести в глобальный helper. Используется в некоторых местах
  const specializationsList = authorSpecializations
    .map(specialization => specialization.title)
    .join(', ');

  return (
    <div className={s.comment}>
      <div className={s.header}>
        <div
          className={classNames(s.avatar, { [s.clickable]: isUserMovable })}
          onClick={moveToAuthor}
        >
          <img src={avatar} />
        </div>
        <div
          className={classNames(s.author, { [s.clickable]: isUserMovable })}
          onClick={moveToAuthor}
        >
          <p className={s.name}>{fullName}</p>
          {!!specializationsList.length && (
            <p className={s.specialization}>{specializationsList}</p>
          )}
          {isAuthorAdmin && <p className={s.specialization}>Администратор</p>}
        </div>
        {withTrash && (
          <div className={s.deleteBtn} onClick={handleDelete}>
            <GlobalSvgSelector id="trash" />
          </div>
        )}
      </div>
      <div className={s.content}>
        <p className={s.text}>{text}</p>
        <p className={s.createdAt}>{currentDate}</p>
      </div>
    </div>
  );
}
