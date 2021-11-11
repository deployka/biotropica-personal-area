import React, { useState } from 'react';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routesList';
import { Loader } from '../shared/Global/Loader/Loader';

import { Header } from '../shared/Global/Header/Header';
import { Sidebar } from '../shared/Global/Sidebar/Sidebar';
import { Modals } from '../modals/Modals';
import { SidebarChat } from '../shared/Global/SidebarChat/SidebarChat';
import { SidebarNotifications } from '../shared/Global/SidebarNotifications/SidebarNotifications';

export const Routes = () => {
  const [page, setPage] = useState<string>('Главная');
  const [sidebarNotificationsOpen, setSidebarNotificationsOpen] =
    useState<boolean>(false);
  const [chatNotificationsOpen, setSidebarChatOpen] = useState<boolean>(false);
  return (
    <Switch>
      <Suspense fallback={<Loader />}>
        <div className="global__container">
          <Modals />
          <Sidebar
            setSidebarNotificationsOpen={setSidebarNotificationsOpen}
            setSidebarChatOpen={setSidebarChatOpen}
            chatNotificationsOpen={chatNotificationsOpen}
            setPage={setPage}
          />
          <SidebarChat
            open={chatNotificationsOpen}
            setOpen={setSidebarChatOpen}
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
            <Switch>
              {routes.map(({ component: Component, path, exact }) => (
                <Route path={`/${path}`} key={path} exact={exact}>
                  <Component />
                </Route>
              ))}
            </Switch>
          </div>
        </div>
      </Suspense>
    </Switch>
  );
};
