import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import s from './ActionsMenu.module.scss';

import './Animations.css';

type Props = {
  forId: string;
  isOpened: boolean;
  onClose: () => void;
};

export const ActionMenu = ({ forId, isOpened, onClose }: Props) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const el = document.querySelector(`#${forId}`);
    if (!el) return;

    const top = el.getBoundingClientRect().top;
    const left = el.getBoundingClientRect().left;

    console.log(top, left);

    setPosition({ top, left });

    console.log(el);
  }, [forId]);

  return (
    <CSSTransition
      in={isOpened}
      timeout={500}
      classNames="show-up"
      unmountOnExit
    >
      <div className={s.background} onClick={onClose}>
        <div className={s.actionSelect} style={position}>
          <div className={s.action}>Редактировать</div>
          <div className={`${s.action} ${s.red}`}>Удалить</div>
        </div>
      </div>
    </CSSTransition>
  );
};
