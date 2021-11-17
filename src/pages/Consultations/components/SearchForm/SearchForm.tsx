import React from 'react';
import { ConsultationsSvgSelector } from '../../../../assets/icons/consultations/ConsultationsSvgSelector';
import { SelectCustom } from '../../../../shared/Form/Select/SelectCustom';

import s from './SearchForm.module.scss';

interface Props {}

export const SearchForm = (props: Props) => {
  const options = [
    { value: 'Диетолог', label: 'Диетолог' },
    { value: 'Эндокринолог', label: 'Эндокринолог' },
  ];

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
      height: 40,
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

  return (
    <form className={s.search}>
      <label className={s.searchLabel} htmlFor="searchInput-1">
        <div className={s.icon}>
          <ConsultationsSvgSelector id="search" />
        </div>
        <input
          className={s.searchInput}
          type="text"
          name=""
          id="searchInput-1"
          placeholder="Введите имя специалиста"
        />
      </label>

      <button className={s.button} type="button">
        <div className={s.icon}>
          <ConsultationsSvgSelector id="search" />
        </div>
        <p className={s.hideableText}>Найти</p>
      </button>

      <div className={s.select}>
        <SelectCustom
          Styles={selectStyles}
          hideLabel={true}
          onChange={(e: any) => {
            console.log('change');
          }}
          placeholder="Специалист"
          onBlur={() => {
            console.log('blur');
          }}
          name="specialist"
          value={null}
          options={options}
          settings={{ touched: '', errors: '' }}
        />
      </div>
    </form>
  );
};
