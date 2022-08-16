import React from 'react';

import SearchIcon from '../../../assets/icons/Search.svg';
import MobileSearchIcon from '../../../assets/icons/MobileSearch.svg';

import s from './Header.module.scss';

type Props = {
  usersCount: number;
  onChangeSearchInput: () => void;
  onSearchButtonClick: () => void;
};

export const SpecialistConsultationsHeader = ({
  usersCount,
  onChangeSearchInput,
  onSearchButtonClick,
}: Props) => {
  return (
    <div className={s.header}>
      <div className={s.headerLeft}>
        <h2 className={s.headerTitle}>Все видеоконсультации</h2>
        <span className={s.usersCount}>{usersCount}</span>
      </div>
      <div className={s.headerRight}>
        <img src={SearchIcon} alt="" className={s.searchIcon} />
        <input
          type="text"
          placeholder="Поиск консультаций..."
          className={s.searchInput}
          //   ref={searchInputRef}
          //   value={searchInput}
          onChange={onChangeSearchInput}
        />
        <button onClick={onSearchButtonClick}>
          <img src={MobileSearchIcon} alt="" className={s.mobileSearchIcon} />
        </button>
      </div>
    </div>
  );
};
