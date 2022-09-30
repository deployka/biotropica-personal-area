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

type Props = {
  comment: CommentType;
  withTrash?: boolean;
  id?: number;
  specializations: Specialization[];
  specialistId: number;
  onDelete?: (id: number) => void;
};

export function Comment({
  comment,
  withTrash = false,
  id,
  specialistId,
  specializations,
  onDelete,
}: Props) {
  const {
    createdAt,
    text,
    author: { lastname, name, profilePhoto },
  } = comment;

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

  function moveToSpecialist() {
    history.push(`/specialists/${specialistId}`);
  }

  // TODO: вынести в глобальный helper. Используется в некоторых местах
  const specializationsList = specializations
    .map(spec => spec.title)
    .join(', ');

  return (
    <div className={s.comment}>
      <div className={s.header}>
        <div className={s.avatar} onClick={moveToSpecialist}>
          <img src={avatar} />
        </div>
        <div className={s.specialist} onClick={moveToSpecialist}>
          <p className={s.name}>{fullName}</p>
          <p className={s.specialization}>{specializationsList}</p>
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
