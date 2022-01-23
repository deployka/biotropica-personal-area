import React, { MouseEventHandler, ReactElement } from 'react';
import classNames from 'classnames';

import s from './Button.module.scss';
import { Classes } from '../Input/Input';
import { Styles } from '../Select/SelectCustom';

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  style?: Styles;
  name?: string;
  options: {
    classes?: Classes;
    content: string | ReactElement;
    setDisabledStyle?: boolean;
    width?: string;
    height?: string;
  };
}

export const Button = (props: Props) => {
  const { options, ...buttonProps } = props;
  const { classes, content, setDisabledStyle, width, height } = options;

  return (
    <>
      <button
        className={classNames({
          [s.btn__discard]: classes?.discard,
          [s.btn]: true,
          [s.disabled]: setDisabledStyle,
        })}
        {...buttonProps}
        style={{ ...buttonProps.style, height, width }}
      >
        {content}
      </button>
    </>
  );
};
