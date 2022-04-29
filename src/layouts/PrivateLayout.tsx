import { Modals } from '../modals/Modals';
import { SidebarNotifications } from '../shared/Global/SidebarNotifications/SidebarNotifications';
import { Header } from '../shared/Global/Header/Header';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { selectCurrentUserData } from '../store/ducks/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useMobile } from '../hooks/useMobile';
import { SidebarSvgSelector } from '../assets/icons/sidebar/SIdebarSvgSelector';
import { useLocation } from 'react-router';
import { fetchSignout, setUserData } from '../store/ducks/user/actionCreators';
import { SidebarDesktop } from '../shared/Global/Sidebar/SidebarDesktop';
import { SidebarMobile } from '../shared/Global/Sidebar/SidebarMobile';
import { SidebarWrapper } from '../shared/Global/SidebarWrapper/SidebarWrapper';
import { Chat } from '../shared/Modules/Chat';
import { eventBus, EventTypes } from '../services/EventBus';
import { chatApi } from '../shared/Global/Chat/services/chatApi';
import { selectUserRoles } from '../store/rtk/slices/authSlice';
import { getCurrentPage } from '../utils/getCurrentPage';

interface Props {
  children: React.ReactNode;
}

export interface Page {
  page: string;
  link: string;
  redirect?: string;
}
export interface Nav extends Page {
  svg?: ReactElement;
}

const pages = [
  { page: 'Профиль', link: 'profile' },
  { page: 'Главная', link: '/' },
  { page: 'Цели', link: 'goals' },
  { page: 'Тарифы', link: 'tariffs' },
  { page: 'Видеоконсультации', link: 'consultations' },
  { page: 'Блог', link: '', redirect: 'https://biotropika.ru/blog/' },
  {
    page: 'Интернет-магазин',
    link: '',
    redirect: 'https://biotropika.ru/shop/',
  },
  { page: 'Анкета', link: 'questionnaire' },
  { page: 'Пользователи', link: 'users' },
  { page: 'Пользователи', link: 'admin' },
  { page: 'Специалист', link: 'specialists' },
  { page: 'Рекомендации', link: 'recommendations' },
];

const clientNav: Nav[] = [
  {
    ...pages[1],
    svg: <SidebarSvgSelector id="home" />,
  },
  {
    ...pages[2],
    svg: <SidebarSvgSelector id="goals" />,
  },
  {
    ...pages[3],
    svg: <SidebarSvgSelector id="tariffs" />,
  },
  {
    ...pages[4],
    svg: <SidebarSvgSelector id="video" />,
  },
  {
    ...pages[5],
    svg: <SidebarSvgSelector id="edit-square" />,
  },
  {
    ...pages[6],
    svg: <SidebarSvgSelector id="services" />,
  },
];

const specialistNav: Nav[] = [
  {
    ...pages[1],
    page: 'Пользователи',
    svg: <SidebarSvgSelector id="users" />,
  },
  {
    ...pages[4],
    svg: <SidebarSvgSelector id="video" />,
  },
  {
    ...pages[5],
    svg: <SidebarSvgSelector id="edit-square" />,
  },
  {
    ...pages[6],
    svg: <SidebarSvgSelector id="services" />,
  },
];

async function sendMessage() {
  const dialogs = await chatApi.fetchDialogs();
  const dialog = dialogs.find(it => it.title === 'Техподдержка');
  if (dialog) {
    eventBus.emit(EventTypes.chatOpen, dialog.id);
  }
}

export function PrivateLayout(props: Props) {
  const currentUser = useSelector(selectCurrentUserData);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const roles = useSelector(selectUserRoles);
  const nav = roles.includes('USER') ? clientNav : specialistNav;

  const currentPage = useMemo(() => getCurrentPage(pathname), [pathname]);

  const defaultPageName = nav
    .concat(pages)
    .find(p => p.link === currentPage)?.page;
  const [page, setPage] = useState<string>(defaultPageName || 'Страница 404');

  useEffect(() => {
    setPage(defaultPageName || 'Страница 404');
  }, [defaultPageName]);

  const isMobile = useMobile();

  const [isUnread] = useState(false);
  const [isNotificationsUnread] = useState(false);
  const [openedDialog, setOpenedDialog] = useState<number | undefined>(
    undefined,
  );

  const [sidebarNotificationsOpen, setSidebarNotificationsOpen] =
    useState<boolean>(false);
  const [chatNotificationsOpen, setSidebarChatOpen] = useState<boolean>(false);

  eventBus.on(EventTypes.chatOpen, (id: number) => {
    setSidebarChatOpen(true);
    setOpenedDialog(id);
  });

  const openChat = useCallback(() => {
    sendMessage().then(() => {
      setSidebarNotificationsOpen(false);
      setSidebarChatOpen(true);
    });
  }, [chatNotificationsOpen]);

  const logout = useCallback(() => {
    dispatch(fetchSignout());
    dispatch(setUserData(undefined));
  }, [dispatch]);

  const onNavClick = useCallback(
    (nav: Partial<Nav>) => {
      if (nav.link && nav.page) setPage(nav.page);
      if (nav.redirect) return window.open(nav.redirect);
    },
    [window],
  );

  return (
    <div className="global__container">
      <Modals />

      {!isMobile ? (
        <SidebarDesktop
          onNavClick={onNavClick}
          defaultSelected={currentPage}
          chatNotificationsOpen={chatNotificationsOpen}
          openChat={openChat}
          logout={logout}
          nav={nav}
          user={currentUser}
        />
      ) : (
        <SidebarMobile
          onNavClick={onNavClick}
          setSidebarChatOpen={setSidebarChatOpen}
          setSidebarNotificationsOpen={setSidebarNotificationsOpen}
          chatNotificationsOpen={chatNotificationsOpen}
          openChat={openChat}
          logout={logout}
          pages={pages}
          nav={nav}
          user={currentUser}
        />
      )}

      {currentUser ? (
        <SidebarWrapper
          isOpened={chatNotificationsOpen}
          onClose={() => setSidebarChatOpen(false)}
        >
          <Chat
            token={localStorage.getItem('token') as string}
            activeDialogId={openedDialog}
            currentUser={currentUser as ChatUser}
            onClose={() => setSidebarChatOpen(false)}
          />
        </SidebarWrapper>
      ) : (
        <div />
      )}
      <SidebarNotifications
        open={sidebarNotificationsOpen}
        setOpen={setSidebarNotificationsOpen}
      />
      <div className="container">
        <Header
          isChatUnread={isUnread}
          isNotificationsUnread={isNotificationsUnread}
          setSidebarChatOpen={setSidebarChatOpen}
          setSidebarNotificationsOpen={setSidebarNotificationsOpen}
          page={page}
        />
        {props.children}
      </div>
    </div>
  );
}
