import { Modals } from '../modals/Modals';
import { SidebarNotifications } from '../shared/Global/SidebarNotifications/SidebarNotifications';
import { Header } from '../shared/Global/Header/Header';
import React, { ReactElement, useEffect, useState } from 'react';
import { selectIsAuth, selectUserData } from '../store/ducks/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../store/ducks/user/contracts/state';
import { Chat } from '../shared/Global/Chat/Chat';
import { SidebarLayout } from './SidebarLayout';

interface Props {
  children: React.ReactNode;
}

export function PrivateLayout(props: Props) {
  const isAuth = useSelector(selectIsAuth);
  const currentUser = useSelector(selectUserData) as User;

  const [page, setPage] = useState<string>('Главная');

  const [sidebarNotificationsOpen, setSidebarNotificationsOpen] =
    useState<boolean>(false);
  const [chatNotificationsOpen, setSidebarChatOpen] = useState<boolean>(false);

  return (
    <div className="global__container">
      <Modals />

      <SidebarLayout
        setPage={setPage}
        setSidebarChatOpen={setSidebarChatOpen}
        setSidebarNotificationsOpen={setSidebarNotificationsOpen}
        chatNotificationsOpen={chatNotificationsOpen}
      />

      <Chat
        isOpened={chatNotificationsOpen}
        isAuth={isAuth}
        token={localStorage.getItem('token') as string}
        currentUser={currentUser}
        onClose={() => setSidebarChatOpen(false)}
      />
      <SidebarNotifications
        open={sidebarNotificationsOpen}
        setOpen={setSidebarNotificationsOpen}
      />
      <div className="container">
        <Header
          setSidebarChatOpen={setSidebarChatOpen}
          setSidebarNotificationsOpen={setSidebarNotificationsOpen}
          page={page}
        />
        {props.children}
      </div>
    </div>
  );
}
