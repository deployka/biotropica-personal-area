import React from 'react';
import s from './AnalyzesComments.module.scss';
import { getMediaLink } from '../../../../../utils/mediaHelper';
import defaultAvatar from '../../../../../assets/images/profile/default_avatar.png';
import { Comment } from '../../../../../store/ducks/analyze/contracts/state';
import { getFullName } from '../../../../../utils/getFullName';
import moment from 'moment';

type Props = {
  comment: Comment;
};

export function AnalyzesComment({ comment }: Props) {
  const {
    createdAt,
    text,
    author: { lastname, name, profilePhoto },
  } = comment;

  const fullName = getFullName(name, lastname);
  const avatar = profilePhoto ? getMediaLink(profilePhoto) : defaultAvatar;
  const date = moment(createdAt).format('DD.MM.YYYY');

  return (
    <div className={s.analyzesComment}>
      <div className={s.avatar}>
        <img src={avatar} alt="av" />
      </div>
      <div className={s.data}>
        <div className={s.data_header}>
          <h5>{fullName}</h5>
          <p>{date}</p>
        </div>
        <p className={s.data_content}>{text}</p>
      </div>
    </div>
  );
}
