import React, { useState } from 'react';
import type { BaseUser } from '../../../@types/entities/BaseUser';
import { ROLE } from '../../../@types/entities/Role';
import { Action, ActionMenu } from '../../UI/ActionsMenu/ActionsMenu';
import { getFullName } from '../../../utils/getFullName';
import { format } from 'date-fns';
import dotsIcon from '../../../assets/icons/dots-horizontal.svg';
import s from './Item.module.scss';

type Props = {
  user: BaseUser;
  onProfile: () => void;
  onToggleUserBanStatus: () => void;
  onWrite: () => void;
};

export const ROLE_TRANSLATIONS = {
  [ROLE.CLIENT]: 'Пользователь',
  [ROLE.ADMIN]: 'Администратор',
  [ROLE.SPECIALIST]: 'Специалист',
};

export const ROLE_COLOR = {
  [ROLE.CLIENT]: '#6f61d0',
  [ROLE.ADMIN]: '#D06361',
  [ROLE.SPECIALIST]: '#309A74',
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

  const formattedUser = {
    id: user.id,
    fullName: getFullName(user.name, user.lastname),
    isBanned: user.banned,
    registrationDate: format(new Date(user.createdAt), 'dd.MM.yyyy'),
    roles: user.roles,
  };

  const role = formattedUser.roles[0];
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
      title: formattedUser.isBanned ? 'Разблокировать' : 'Заблокировать',
      onClick: onToggleUserBanStatus,
      type: 'red',
    },
  ];

  if (formattedUser.isBanned === true) {
    formattedUser.fullName += ' (Заблокирован)';
  }

  return (
    <div className={s.user}>
      <div className={s.name}>
        <p>{formattedUser.fullName}</p>
      </div>
      <div className={s.date}>
        <p>{formattedUser.registrationDate}</p>
      </div>
      <div className={s.role}>
        <p style={{ color: ROLE_COLOR[role?.name] }}>{roleTranslation}</p>
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
      {/* <div className={s.tariff}>
        <p>{formattedUser.tariff}</p>

      </div> */}
    </div>
  );
};
