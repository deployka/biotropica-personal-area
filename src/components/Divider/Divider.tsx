import React from 'react';
import classNames from 'classnames';

import s from './Divider.module.scss';

const Divider = (props: {classes?: string}) => {
  return (
    <hr className={classNames(s.divider, props.classes)} />
  );
};

export default Divider;
