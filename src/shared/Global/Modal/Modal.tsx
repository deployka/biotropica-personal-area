import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Modal.css';

interface IProps {
  children: React.ReactChild;
  isOpened: boolean;
  className?: string;
  close: () => void;
}

const Modal = (props: IProps) => {
  const { children, isOpened, className, close } = props;

  const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    (event.target as Element).id === 'modal-overlay' && close();
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

  // return (
  //   <>
  //     <CSSTransition in={isOpened} timeout={500} classNames='show-up' unmountOnExit>
  //       <div className={s.modal}>
  //         {children}
  //       </div>
  //     </CSSTransition>
  //     <div className={s.background} onClick={() => close()}>
  //     </div>
  //   </>
  // )
};

export default Modal;
