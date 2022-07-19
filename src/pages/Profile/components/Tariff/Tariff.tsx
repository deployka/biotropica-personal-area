import React from 'react';
import { Link } from 'react-router-dom';
import s from './Tariff.module.scss';

import payImg from '../../../../assets/icons/transaction.svg';
import { format } from 'date-fns';
import { formatDate } from '../../../../components/Task/PreviewComment/PreviewCommentHelper';

type Props = {
  title?: string;
  expires?: string;
  isPaid?: boolean;
};

export const Tariff = ({ expires, title, isPaid }: Props) => {
  console.log(isPaid);

  return (
    <div style={{ textDecoration: 'none' }} className={s.tariff}>
      <div className={s.title}>
        {title && 'Тип тарифа: '}
        <p>{title || 'У вас нет тарифа'}</p>
      </div>
      <div className={s.date}>
        {expires && (
          <p>
            До {'  '}
            {formatDate(new Date(expires).toDateString()) || '-'}
          </p>
        )}
      </div>
      <div className={s.isPaid}>
        <p
          style={{
            color: !isPaid && title ? 'tomato' : isPaid ? '#61D07F' : '#9e97be',
          }}
        >
          {isPaid ? (
            'Тариф оплачен'
          ) : (
            <>
              {'  '} {title ? 'Тариф не оплачен' : 'Купить тариф'}: {'  '}
              <Link to={'/tariffs'}>
                <img title="Оплатить тариф" src={payImg} />
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
