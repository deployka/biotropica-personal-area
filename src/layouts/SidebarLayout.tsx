import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMobile } from '../hooks/useMobile';
import { SidebarSvgSelector } from '../assets/icons/sidebar/SIdebarSvgSelector';
import { useLocation } from 'react-router';
import { fetchSignout, setUserData } from '../store/ducks/user/actionCreators';
import { SidebarDesktop } from '../shared/Global/Sidebar/SidebarDesktop';
import { SidebarMobile } from '../shared/Global/Sidebar/SidebarMobile';
import { selectUserData } from '../store/ducks/user/selectors';

export interface Pages {
  page: string;
  link: string;
}
export interface Nav extends Pages {
  svg: ReactElement;
}

interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  setSidebarChatOpen: Dispatch<SetStateAction<boolean>>;
  setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  chatNotificationsOpen: boolean;
}

export const SidebarLayout = ({
  setPage,
  setSidebarChatOpen,
  setSidebarNotificationsOpen,
  chatNotificationsOpen,
}: Props) => {
  const isMobile = useMobile();

  const pages = [
    { page: 'Профиль', link: '/profile' },
    { page: 'Главная', link: '/' },
    { page: 'Цели', link: '/goals' },
    { page: 'Тарифы', link: '/tariffs' },
    { page: 'Видео', link: '/video' },
    { page: 'Блог', link: '/blog' },
    { page: 'Дополнительные услуги', link: '/services' },
  ];

  const nav: Nav[] = [
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

  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector(selectUserData);

  useEffect(() => {
    for (const value of pages) {
      const currentPath = location.pathname.split('/');
      if ('/' + currentPath[1] === value.link) {
        setPage(value.page);
        break;
      } else {
        setPage('Cтраница 404');
      }
    }
  }, [location.pathname]);

  function openChat() {
    setSidebarNotificationsOpen(false);
    setSidebarChatOpen(!chatNotificationsOpen);
  }

  async function logout() {
    dispatch(fetchSignout());
    dispatch(setUserData(undefined));
  }

  return (
    <>
      {!isMobile ? (
        <SidebarDesktop
          setPage={setPage}
          setSidebarChatOpen={setSidebarChatOpen}
          setSidebarNotificationsOpen={setSidebarNotificationsOpen}
          chatNotificationsOpen={chatNotificationsOpen}
          openChat={openChat}
          logout={logout}
          pages={pages}
          nav={nav}
          user={user}
          location={location}
        />
      ) : (
        <SidebarMobile
          setPage={setPage}
          setSidebarChatOpen={setSidebarChatOpen}
          setSidebarNotificationsOpen={setSidebarNotificationsOpen}
          chatNotificationsOpen={chatNotificationsOpen}
          openChat={openChat}
          logout={logout}
          pages={pages}
          nav={nav}
          user={user}
          location={location}
        />
      )}
    </>
  );
};
