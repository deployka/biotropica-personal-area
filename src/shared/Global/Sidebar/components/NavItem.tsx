import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Nav } from '../../../../layouts/PrivateLayout';

import s from '../SidebarDesktop.module.scss';

type Props = {
  item: Nav;
  onClick: (item: Nav) => void;
  isActive: boolean;
};

export function NavItem({ item, onClick, isActive }: Props) {
  return (
    <Link
      onClick={() => onClick(item)}
      to={item.link === '/' ? item.link : `/${item.link}`}
      className={classNames(s.link, { [s.active]: isActive })}
    >
      <div className={s.icon}>{item.svg}</div>
      <div className={s.prompt}>
        <p>{item.page}</p>
      </div>
    </Link>
  );
}
