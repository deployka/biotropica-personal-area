import React, { ReactNode } from 'react';
import classNames from 'classnames';

import s from './Button.module.scss';
import { Loader } from '../../shared/Form/Loader/Loader';

export interface Props {
  className?: string;
  isPrimary?: boolean;
  isDisabled?: boolean;
  isFunctional?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
}

const Button = (props: Props) => {
  const {
    type = 'button',
    children,
    className,
    isPrimary,
    isDisabled,
    isFunctional,
    onClick,
    isLoading,
  } = props;

  return (
    <button
      type={type}
      className={classNames(
        {
          [s.btn]: true,
          [s.btn__primary]: isPrimary,
          [s.btn__functional]: isFunctional,
          [s.btn__disabled]: isDisabled,
        },
        className,
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading ? <Loader /> : ''}
      {children}
    </button>
  );
};

export default Button;
