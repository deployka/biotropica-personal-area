import classNames from 'classnames';
import React, {
  Dispatch,
  memo,
  MouseEvent,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchSignout } from '../../../store/ducks/user/actionCreators';
import { selectUserData } from '../../../store/ducks/user/selectors';

import s from './Sidebar.module.scss';

import defaultAvatar from '../../../assets/images/profile/default_avatar.png';
import { SidebarSvgSelector } from '../../../assets/icons/sidebar/SIdebarSvgSelector';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';

interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  setSidebarChatOpen: Dispatch<SetStateAction<boolean>>;
  setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  chatNotificationsOpen: boolean;
}

interface Pages {
  page: string;
  link: string;
}
interface Nav extends Pages {
  svg: ReactElement;
}

export const Sidebar = memo(
  ({
    setPage,
    setSidebarChatOpen,
    setSidebarNotificationsOpen,
    chatNotificationsOpen,
  }: Props) => {
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

    const [close, setClose] = useState<boolean>(false);

    useEffect(() => {
      pages.forEach(value => {
        const currentPath = location.pathname.split('/');
        if ('/' + currentPath[1] === value.link) {
          setPage(value.page);
        }
      });
    }, [location.pathname]);

    function openSidebar() {
      setClose(false);
    }

    function toggleSidebar(e: MouseEvent<HTMLElement>) {
      e.stopPropagation();
      setClose(!close);
    }

    function openChat() {
      setSidebarNotificationsOpen(false);
      setSidebarChatOpen(!chatNotificationsOpen);
    }

    async function logout() {
      dispatch(fetchSignout());
    }

    return (
      <div
        onClick={openSidebar}
        className={classNames(s.sidebar, {
          [s.open]: close,
        })}
      >
        <div className={s.wrapper}>
          <div className={s.close} onClick={toggleSidebar}>
            <GlobalSvgSelector id="next-rounded" />
          </div>
          <div className={s.sidebar__prompt}>
            <p>{'Свернуть'}</p>
          </div>
          <div className={s.sidebar__top}>
            <Link
              to="/profile"
              className={classNames({
                [s.sidebar__avatar]: true,
                [s.active__profile_paid]:
                  pages[0].link === '/' + location.pathname.split('/')[1],
              })}
              onClick={() => setPage('Профиль')}
            >
              <div
                className={s.img}
                style={{
                  backgroundImage: `url(${
                    (user?.profile_photo &&
                      process.env.REACT_APP_BACKEND_URL +
                        '/' +
                        user?.profile_photo) ||
                    defaultAvatar
                  })`,
                }}
              ></div>
            </Link>
            <div className={s.sidebar__divider}></div>
            <nav className={s.sidebar__nav}>
              {nav.map((item: Nav) => (
                <Link
                  key={item.page + item.link}
                  onClick={() => setPage(item.page)}
                  to={item.link}
                  className={
                    item.link === '/' + location.pathname.split('/')[1]
                      ? s.active__nav
                      : s.nav__link
                  }
                >
                  <div className={s.sidebar__link}>{item.svg}</div>
                  <div className={s.sidebar__prompt}>
                    <p>{item.page}</p>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
          <div className={s.sidebar__bottom}>
            <a
              href="#"
              onClick={openChat}
              className={chatNotificationsOpen ? s.active__chat : s.chat__icon}
            >
              <SidebarSvgSelector id="chat" />
              <div className={s.sidebar__prompt}>
                <p>{'Чат поддержка'}</p>
              </div>
            </a>
            <div className={s.sidebar__divider}></div>
            <div className={s.sidebar__logout}>
              <button onClick={logout} className={s.logout__svg}>
                <SidebarSvgSelector id="logout" />
                <div className={s.sidebar__prompt}>
                  <p>{'Выйти'}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
