import React from 'react';

import s from './Item.module.scss';

type Props = {
  fullName: string;
  handleUserClick: () => void;
  handleRemoveClick: () => void;
};

export const SpecialistListTabItem = ({ fullName, handleUserClick, handleRemoveClick }: Props) => {
  return (
<div className={s.item}>
      <span className={s.name} onClick={handleUserClick}>
        {fullName}
      </span>
      <div>
          <button className={[s.btn, s.reject].join(' ')} onClick={handleRemoveClick}>Отказаться от специалиста</button>
      </div>
    </div>
  );
};
