import { PopupBackground } from '../PopupBackground/PopupBackground';
import classNames from 'classnames';
import s from './SidebarWrapper.module.scss';
import React from 'react';

type SidebarWrapperProps = {
  isOpened: boolean;
  onClose(): void;
  children: React.ReactNode;
};
export function SidebarWrapper(props: SidebarWrapperProps) {
  return (
    <>
      <div onClick={() => props.onClose()}>
        <PopupBackground open={props.isOpened} />
      </div>
      <div
        className={classNames({
          [s.sidebarNotifications]: true,
          [s.open]: props.isOpened,
        })}
      >
        {props.children}
      </div>
    </>
  );
}
