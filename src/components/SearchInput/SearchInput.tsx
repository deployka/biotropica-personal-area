import React from 'react';

import s from './SearchInput.module.scss';

import SearchIcon from './search.svg';

export type SearchInputProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const SearchInput = (props: SearchInputProps) => {
  const {
    value,
    placeholder,
    onChange,
  } = props;

  return (
    <label htmlFor='search' className={s.search}>
      <div className={s.searchIcon}>
        <img src={SearchIcon} alt='' />
      </div>
      <input
        id='search'
        type='text'
        value={value}
        placeholder={placeholder || 'Поиск'}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  );
};

export default SearchInput;
