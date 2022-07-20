import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import s from './InfoBar.module.scss';

export interface IInfoBar {
  title: string;
  text?: string | ReactNode;
  textLink?: string;
  bottomLink?: string | ReactNode;
  onClick?: () => void;
  href?: string;
}

interface Props {
  infoBar: IInfoBar;
}

export const InfoBar = ({ infoBar }: Props) => {
  return (
    <div className={s.infoBar}>
      <div className={s.header}>
        <div className={s.title}>
          <p>{infoBar.title}</p>
        </div>
      </div>
      <div className={s.text}>
        <p>{infoBar.text || ''}</p>
        {infoBar.textLink && (
          <div className={s.link}>
            <a style={{ cursor: 'pointer' }} onClick={infoBar.onClick}>
              {infoBar.textLink}
            </a>
          </div>
        )}
      </div>
      {infoBar.bottomLink && (
        <div className={s.bottomLink}>
          <Link to={`${infoBar.href || '#'}`}>{infoBar.bottomLink}</Link>
        </div>
      )}
    </div>
  );
};
