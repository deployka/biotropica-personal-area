import React, { useState } from 'react';
import { SpecializationName } from '../../../@types/entities/Specialization';
import { ConsultationsSvgSelector } from '../../../assets/icons/consultations/ConsultationsSvgSelector';
import {
  ISelect,
  SelectCustom,
} from '../../../shared/Form/Select/SelectCustom';
import { selectStyles } from './selectStyles';

import s from './SortForm.module.scss';

interface Props {
  onSelectChange: (e: ISelect<string>[]) => void;
  onSearchChange: (e: string) => void;
  selectValue: ISelect<string>[] | undefined;
  searchValue: string;
}

export const ConsultationsSearchForm = ({
  onSelectChange,
  selectValue,
  searchValue,
  onSearchChange,
}: Props) => {
  const options = Object.keys(SpecializationName).map(key => ({
    value: key,
    label: SpecializationName[key as keyof typeof SpecializationName],
  }));

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

      {/* <div className={s.select}>
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
      </div> */}
    </form>
  );
};
