import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

import './Modal.css';

interface IProps {
  children: React.ReactChild;
  isOpened: boolean;
  className?: string;
  close: () => void;
}

const Modal = (props: IProps) => {
  const { children, isOpened, className, close } = props;

  const backgroundRef = useRef(null);
  useLockBodyScroll();

  useOnClickOutside(backgroundRef, close);

  return (
    <CSSTransition
      in={isOpened}
      timeout={500}
      classNames="show-up"
      unmountOnExit
    >
      <div className="modal-overlay" id="modal-overlay">
        <div ref={backgroundRef} className={'modal ' + className}>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
