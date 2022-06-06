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

type Props = {
  comment: CommentType;
  withTrash?: boolean;
  id?: number;
  specialistId: number;
  onDelete?: (id: number) => void;
};

export function Comment({
  comment,
  withTrash = false,
  id,
  specialistId,
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
      type: NotificationType.INFO,
      id: 'remove-comment-notification',
    });
  }

  function handleDelete() {
    showDeleteConfirmation();
  }

  function moveToSpecialist() {
    history.push(`/specialists/${specialistId}`);
  }

  return (
    <div className={s.comment}>
      <div className={s.avatar} onClick={moveToSpecialist}>
        <img src={avatar} alt="av" />
      </div>
      <div className={s.data}>
        <div className={s.data_header}>
          <h5 onClick={moveToSpecialist}>{fullName}</h5>
          <div className={s.rightGroup}>
            <p>{currentDate}</p>
            {withTrash && (
              <div className={s.deleteBtn} onClick={handleDelete}>
                <GlobalSvgSelector id="trash" />
              </div>
            )}
          </div>
        </div>
        <p className={s.data_content}>{text}</p>
      </div>
    </div>
  );
}
