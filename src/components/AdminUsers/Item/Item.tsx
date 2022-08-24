import React, { useState } from 'react';
import { Role, ROLE } from '../../../@types/entities/Role';
import { Action, ActionMenu } from '../../UI/ActionsMenu/ActionsMenu';
import dotsIcon from './../../../assets/icons/dots-horizontal.svg';
import s from './Item.module.scss';

type User = {
  id: number;
  fullName: string;
  isBanned: boolean;
  registrationDate: string;
  tariff: string;
  roles: Role[];
};

type Props = {
  user: User;
  onProfile: () => void;
  onToggleUserBanStatus: () => void;
  onWrite: () => void;
};

export const ROLE_TRANSLATIONS = {
  [ROLE.CLIENT]: 'Пользователь',
  [ROLE.ADMIN]: 'Администратор',
  [ROLE.SPECIALIST]: 'Специалист',
};

export const UserItem = ({
  user,
  onProfile,
  onToggleUserBanStatus,
  onWrite,
}: Props) => {
  const [visible, setVisible] = useState(false);

  function showPopUp() {
    setVisible(prevState => !prevState);
  }

  const role = user.roles[0];
  const roleTranslation = ROLE_TRANSLATIONS[role?.name] || '-';

  const actions: Action[] = [
    {
      title: 'Перейти',
      onClick: onProfile,
    },
    {
      title: 'Написать',
      onClick: onWrite,
    },
    {
      title: user.isBanned ? 'Разблокировать' : 'Заблокировать',
      onClick: onToggleUserBanStatus,
      type: 'red',
    },
  ];

  return (
    <div className={s.user}>
      <div className={s.name}>
        <p>{user.fullName}</p>
      </div>
      <div className={s.date}>
        <p>{user.registrationDate}</p>
      </div>
      <div className={s.role}>
        <p
          style={
            role?.name === ROLE.SPECIALIST
              ? { color: '#309A74' }
              : role?.name === ROLE.ADMIN
              ? { color: '#D06361' }
              : {}
          }
        >
          {roleTranslation}
        </p>
      </div>
      <div className={s.tariff}>
        <p>{user.tariff}</p>
        <ActionMenu
          actions={actions}
          onClose={() => setVisible(false)}
          isOpened={visible}
        >
          <div
            className={s.dots}
            onClick={showPopUp}
            style={visible ? { transform: 'rotate(90deg)' } : {}}
          >
            <img src={dotsIcon} />
          </div>
        </ActionMenu>
      </div>
    </div>
  );
};
