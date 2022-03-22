import React, { Dispatch, SetStateAction } from 'react';

import s from './Recommendation.module.scss';

interface Props {
  height: number | string;
  setHeight: Dispatch<SetStateAction<number | string>>;
}

export const Info = ({ height, setHeight }: Props) => {
  function onClick() {
    setHeight(height === 0 ? 'auto' : 0);
  }

  return (
    <div className={s.info}>
      <div className={s.lastUpdate}>
        <p>обновлено 5 июня 2021г.</p>
      </div>
      <div className={s.hideButton} onClick={onClick}>
        <p>{height ? 'показать рекомендации' : 'скрыть рекомендации'}</p>
      </div>
    </div>
  );
};
