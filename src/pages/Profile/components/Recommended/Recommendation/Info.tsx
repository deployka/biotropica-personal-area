import React, { Dispatch, SetStateAction } from 'react';

import s from './Recommendation.module.scss';

interface Props {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
}

export const Info = ({ hidden, setHidden }: Props) => {
  return (
    <div className={s.info}>
      <div className={s.lastUpdate}>
        <p>обновлено 5 июня 2021г.</p>
      </div>
      <div
        className={s.hideButton}
        onClick={() => {
          setHidden(!hidden);
        }}
      >
        <p>{hidden ? 'показать рекомендации' : 'скрыть рекомендации'}</p>
      </div>
    </div>
  );
};
