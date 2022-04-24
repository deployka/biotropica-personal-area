import classNames from 'classnames';
import React from 'react';
import { GlobalSvgSelector } from '../../assets/icons/global/GlobalSvgSelector';
import { Order } from '../../types/constants/Order';

import s from './Comments.module.scss';

type Props = {
  onToggle(): void;
  onSort?: (by: Order) => void;
  sort?: Order;
  isOpen: boolean;
  length: number;
};

export function CommentsInfo({
  onToggle,
  isOpen,
  length,
  onSort,
  sort,
}: Props) {
  function isActive(order: Order) {
    return sort === order;
  }
  return (
    <>
      {!!length && (
        <div className={s.commentsInfo}>
          <div onClick={onToggle} className={s.commentsCount}>
            {isOpen ? 'Скрыть' : 'Показать'} комментарии: <p>{length}</p>
          </div>
          {onSort && (
            <div className={s.sort}>
              <div
                className={classNames(s.up, { [s.active]: isActive('ASC') })}
                onClick={() => onSort('ASC')}
              >
                <GlobalSvgSelector id="arrow" />
              </div>
              <div
                className={classNames(s.down, { [s.active]: isActive('DESC') })}
                onClick={() => onSort('DESC')}
              >
                <GlobalSvgSelector id="arrow" />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
