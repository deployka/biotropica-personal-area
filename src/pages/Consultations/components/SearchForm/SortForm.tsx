import React, { useState } from 'react';
import { ConsultationsSvgSelector } from '../../../../assets/icons/consultations/ConsultationsSvgSelector';
import {
  ISelect,
  SelectCustom,
} from '../../../../shared/Form/Select/SelectCustom';
import { SpecializationName } from '../../../../store/ducks/specialist/contracts/state';

import s from './SortForm.module.scss';

interface Props {
  onSelectChange: (e: ISelect<string>[]) => void;
  onSearchChange: (e: string) => void;
  selectValue: ISelect<string>[] | null;
  searchValue: string;
}

export const SearchForm = ({
  onSelectChange,
  selectValue,
  searchValue,
  onSearchChange,
}: Props) => {
  const options = Object.keys(SpecializationName).map(key => ({
    value: key,
    label: SpecializationName[key as keyof typeof SpecializationName],
  }));

  const selectStyles = {
    container: (styles: any) => ({
      ...styles,
      width: '100%',
      height: '100%',
    }),
    control: (styles: any) => ({
      ...styles,
      borderRadius: 50,
      height: '100%',
      border: '1px solid #9895a7',
      paddingLeft: 5,
    }),

    option: (styles: any, { isSelected }: any) => ({
      ...styles,
      background: isSelected ? '#F7F6FB' : null,
      color: '#1E174D',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      fontWeight: 400,
      padding: '14px 12px',
    }),
    menu: (styles: any) => ({
      ...styles,
      borderRadius: 5,
      border: null,
      boxShadow: '0px 1px 10px rgba(30, 23, 77, 0.05);',
      zIndex: '45',
      overflow: 'hidden',
    }),
    menuList: (styles: any) => ({
      ...styles,
      paddingBottom: 0,
      paddingTop: 0,
    }),
  };

  const [query, setQuery] = useState('');

  return (
    <form
      className={s.search}
      onSubmit={e => {
        e.preventDefault();
        onSearchChange(query);
      }}
    >
      <label className={s.searchLabel} htmlFor="searchInput-1">
        <div className={s.icon}>
          <ConsultationsSvgSelector id="search" />
        </div>
        <input
          className={s.searchInput}
          type="text"
          name="search"
          id="searchInput-1"
          placeholder="Введите имя специалиста"
          value={searchValue}
          onChange={e => {
            onSearchChange(e.target.value);
            setQuery(e.target.value);
          }}
        />
      </label>

      <div className={s.select}>
        <SelectCustom
          Styles={selectStyles}
          hideLabel={true}
          onChange={(e: ISelect<string>) => {
            onSelectChange([e]);
          }}
          placeholder="Специалист"
          name="specialist"
          isClearable={true}
          value={selectValue && selectValue[0]}
          options={options}
        />
      </div>
    </form>
  );
};
