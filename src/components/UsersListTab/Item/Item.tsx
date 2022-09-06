import React from 'react';

import s from './Item.module.scss';

type Props = {
  fullName: string;
  onClick: () => void;
};

export const UsersListTabItem = ({ fullName, onClick }: Props) => {
  return (
    <div className={s.item}>
      <span className={s.name} onClick={onClick}>
        {fullName}
      </span>
    </div>
  );
};
