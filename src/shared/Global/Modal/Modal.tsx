import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';

import './Modal.css';

interface IProps {
  children: React.ReactChild;
  isOpened: boolean;
  className?: string;
  close: () => void;
}

const Modal = (props: IProps) => {
  const { children, isOpened, className, close } = props;

  useLockBodyScroll();

  const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.id === 'modal-overlay' && close();
  };

  return (
    <CSSTransition
      in={isOpened}
      timeout={500}
      classNames="show-up"
      unmountOnExit
    >
      <div
        className="modal-overlay"
        id="modal-overlay"
        onClick={handleClickOverlay}
      >
        <div className={'modal ' + className}>{children}</div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
