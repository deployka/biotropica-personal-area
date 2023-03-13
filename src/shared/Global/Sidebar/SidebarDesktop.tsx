import React, { memo, useCallback, useEffect, useState } from 'react';

import s from './SidebarDesktop.module.scss';

import { Nav } from '../../../layouts/PrivateLayout';
import { Avatar } from './components/Avatar';
import { NavItem } from './components/NavItem';
import { SupportChatBtn } from './components/SupportChatBtn';
import { LogoutBtn } from './components/LogoutBtn';
import { BaseUser } from '../../../@types/entities/BaseUser';

interface Props {
  onNavClick: (nav: Partial<Nav>) => void;
  chatNotificationsOpen: boolean;
  defaultSelected: string;
  openChat: () => void;
  logout: () => void;
  nav: Nav[];
  user: BaseUser | undefined;
  isPaid: boolean;
}

export const SidebarDesktop = memo(
  ({
    onNavClick,
    defaultSelected,
    chatNotificationsOpen,
    nav,
    openChat,
    logout,
    user,
    isPaid,
  }: Props) => {
    const [selected, setSelected] = useState<string>(defaultSelected);
    const [isAdmin, setIsAdmin] = useState(true);

    useEffect(() => {
      if (user?.roles[0].name === 'ADMIN') setIsAdmin(false);
      setSelected(defaultSelected);
    }, [defaultSelected]);

    const handleItemClick = (item: Partial<Nav>) => () => {
      item.link && setSelected(item.link);
      onNavClick(item);
    };

    const isSelectedItem = useCallback(
      (link: string) => selected === link,
      [selected],
    );

    return (
      <div className={s.sidebar}>
        <div className={s.wrapper}>
          <div className={s.top}>
            <Avatar
              isPaid={isPaid}
              avatar={user?.profilePhoto || ''}
              isActive={isSelectedItem('profile')}
              onClick={handleItemClick({ link: 'profile', page: 'Профиль' })}
            />

            <div className={s.divider}></div>

            <nav className={s.nav}>
              {nav.map((item: Nav) => (
                <NavItem
                  item={item}
                  key={item.page}
                  isActive={item.link ? isSelectedItem(item.link) : false}
                  onClick={handleItemClick(item)}
                />
              ))}
            </nav>
          </div>

          <div className={s.bottom}>
            {
            isAdmin && (
              <SupportChatBtn
              onClick={openChat}
              isActive={chatNotificationsOpen}
            />
            )}

            <div className={s.divider}></div>

            <LogoutBtn onClick={logout} />
          </div>
        </div>
      </div>
    );
  },
);

SidebarDesktop.displayName = 'SidebarDesktop';
