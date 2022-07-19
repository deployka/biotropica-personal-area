import React from 'react';
import classNames from 'classnames';
import arrowIcon from './../../../assets/icons/fieldArrow.svg';
import s from './FieldHeader.module.scss';

type Props = {
  title: string;
  isOpened: boolean;
  onChangeVisibility: () => void;
};

export function FilterFieldHeader({
  title,
  isOpened,
  onChangeVisibility,
}: Props) {
  return (
    <div className={s.name} onClick={onChangeVisibility}>
      <p>{title}</p>
      <div className={classNames(s.arrowIcon, { [s.hidden]: isOpened })}>
        <img src={arrowIcon} />
      </div>
    </div>
  );
}
