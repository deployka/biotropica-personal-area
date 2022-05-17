import React, { memo, useCallback, useEffect, useState } from 'react';

import s from './SidebarDesktop.module.scss';

import { Nav } from '../../../layouts/PrivateLayout';
import { Avatar } from './components/Avatar';
import { NavItem } from './components/NavItem';
import { SupportChatBtn } from './components/SupportChatBtn';
import { LogoutBtn } from './components/LogoutBtn';

interface Props {
  onNavClick: (nav: Partial<Nav>) => void;
  chatNotificationsOpen: boolean;
  defaultSelected: string;
  openChat: () => void;
  logout: () => void;
  nav: Nav[];
  user: User | undefined;
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
  }: Props) => {
    const [selected, setSelected] = useState<string>(defaultSelected);

    useEffect(() => {
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
              avatar={user?.profilePhoto || ''}
              isActive={isSelectedItem('profile')}
              onClick={handleItemClick({ link: 'profile', page: 'Профиль' })}
            />

            <div className={s.divider}></div>

            <nav className={s.nav}>
              {nav.map((item: Nav) => (
                <NavItem
                  item={item}
                  key={item.link}
                  isActive={item.link ? isSelectedItem(item.link) : false}
                  onClick={handleItemClick(item)}
                />
              ))}
            </nav>
          </div>

          <div className={s.bottom}>
            <SupportChatBtn
              onClick={openChat}
              isActive={chatNotificationsOpen}
            />

            <div className={s.divider}></div>

            <LogoutBtn onClick={logout} />
          </div>
        </div>
      </div>
    );
  },
);

SidebarDesktop.displayName = 'SidebarDesktop';
