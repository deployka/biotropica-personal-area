import React from 'react';
import s from '../InnerChat.module.scss';
import {BtnBack} from '../../../../buttons/BtnBack/BtnBack';

import defaultAvatar from '../../../../../assets/images/profile/default_avatar.png';
import {getMediaLink} from '../../../../../utils/mediaHelper';

interface Props {
    user: ChatUser;
    onClose: () => void;
}

export function ChatHeader({user, onClose}: Props) {
    return (
        <div className={s.chat__header}>
            <div className={s.btn__back} onClick={onClose}>
                <BtnBack/>
            </div>
            <div className={s.chat__header__profile}>
                <div className={s.profile__avatar__wrapper}>
                    <img
                        src={
                            (user.profile_photo && getMediaLink(user.profile_photo)) ||
                            defaultAvatar
                        }
                        className={s.profile__avatar}
                    />
                </div>
                <div className={s.profile__info}>
                    <div className={s.profile__name}>{user.email}</div>
                    <div className={s.profile__post}>Фитнес инструктор</div>
                </div>
            </div>
        </div>
    );
}
