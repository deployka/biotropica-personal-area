import React from 'react';

import SearchIcon from '../../../assets/icons/Search.svg';
import MobileSearchIcon from '../../../assets/icons/MobileSearch.svg';

import s from './Header.module.scss';

type Props = {
  usersCount: number;
  searchInputValue: string;
  onChangeSearchInput: (value: string) => void;
};

export const SpecialistConsultationsHeader = ({
  usersCount,
  searchInputValue,
  onChangeSearchInput,
}: Props) => {
  return (
    <div className={s.header}>
      <div className={s.headerLeft}>
        <h2 className={s.headerTitle}>Все видеоконсультации</h2>
        <span className={s.usersCount}>{usersCount}</span>
      </div>
      <div className={s.headerRight}>
        <img src={SearchIcon} className={s.searchIcon} />
        <input
          type="text"
          placeholder="Поиск консультаций..."
          className={s.searchInput}
          value={searchInputValue}
          onChange={e => onChangeSearchInput(e.target.value)}
        />
      </div>
    </div>
  );
};
