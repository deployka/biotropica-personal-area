import React, { CSSProperties, ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import classNames from 'classnames';

import s from './ActionsMenu.module.scss';

import './Animations.css';

export type Action = {
  title: string;
  type?: 'red';
  isHidden?: boolean;
  onClick: () => void;
};

type Position = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

type Props = {
  children: ReactNode;
  isOpened: boolean;
  actions: Action[];
  className?: string;
  position?: Position;
  onClose: () => void;
};

export const ActionMenu = ({
  children,
  isOpened,
  actions,
  position,
  className,
  onClose,
}: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, onClose, wrapperRef);

  const visibleActions = actions.filter(action => !action.isHidden);

  return (
    <div ref={wrapperRef} className={classNames(s.wrapper, className)}>
      {children}
      <CSSTransition
        in={isOpened}
        timeout={300}
        classNames="show-up"
        unmountOnExit
      >
        <div ref={menuRef} className={s.actionSelect} style={position}>
          {visibleActions.map(action => (
            <div
              key={action.title}
              onClick={() => {
                action.onClick();
                onClose();
              }}
              className={classNames(s.action, s[action?.type || ''])}
            >
              {action.title}
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};
