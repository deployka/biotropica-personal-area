import React from 'react';
import classNames from 'classnames';

import s from './Button.module.scss';

interface Props {
  onClick?: (e: React.MouseEvent) => void;
  type?: any;
  disabled?: any;

  options: {
    classes?: any;
    content: any;
    setDisabledStyle?: any;
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
        style={{ height, width }}
        className={classNames({
          [s.btn__discard]: classes?.discard,
          [s.btn]: true,
          [s.disabled]: setDisabledStyle,
        })}
        {...buttonProps}
      >
        {content}
      </button>
    </>
  );
};
