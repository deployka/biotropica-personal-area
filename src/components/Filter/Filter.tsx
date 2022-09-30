import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FilterCheckboxField } from './CheckboxField/CheckboxField';
import { FilterRadioField } from './RadioField/RadioField';
import closeIcon from './../../assets/icons/close.svg';

import s from './Filter.module.scss';

export type FilterField = {
  name: string;
  key: string;
  type: 'radio' | 'checkbox';
  filters: FilterOption[];
};

export type FilterOption = {
  value: string;
  label: string;
};

type SelectedFilters = Record<FilterField['key'], FilterOption['value'][]>;

type UsersFilterProps = {
  isHidden?: boolean;
  filters: FilterField[];
  selectedFilters: SelectedFilters;
  onClose?: () => void;
  onChange(selectedFilters: SelectedFilters): void;
};

export function Filter({
  isHidden,
  onClose,
  filters,
  selectedFilters,
  onChange,
}: UsersFilterProps) {
  function handleOnChange(key: string, value: string[]) {
    onChange({ ...selectedFilters, [key]: value });
  }

  return (
    <div className={classNames(s.filter, { [s.hidden]: isHidden })}>
      <div className={s.header}>
        <p>Фильтры</p>
        <img src={closeIcon} onClick={onClose} />
      </div>
      <div className={s.filter_container}>
        {filters.map((field, i) =>
          field.type === 'radio' ? (
            <FilterRadioField
              key={field.key}
              selectedFields={selectedFilters?.[field.key] || []}
              field={field}
              onChange={values => handleOnChange(field.key, values)}
            />
          ) : (
            <FilterCheckboxField
              key={field.key}
              selectedFields={selectedFilters?.[field.key] || []}
              field={field}
              onChange={values => handleOnChange(field.key, values)}
            />
          ),
        )}
      </div>
    </div>
  );
}
