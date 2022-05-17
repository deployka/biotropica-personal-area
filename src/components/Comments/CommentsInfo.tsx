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
  return (
    <>
      <div className={s.commentsInfo}>
        <div onClick={onToggle} className={s.commentsCount}>
          {isOpen ? 'Скрыть' : 'Показать'} комментарии: <p>{length}</p>
        </div>
        {onSort && (
          <div
            className={s.sort}
            onClick={() => onSort(sort === 'ASC' ? 'DESC' : 'ASC')}
          >
            {isOpen && <div className={s.sortType}>По дате:</div>}{' '}
            {isOpen && (
              <div
                className={classNames({
                  [s[sort === 'ASC' ? 'up' : 'down']]: true,
                })}
              >
                <GlobalSvgSelector id="arrow" />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
