import s from './UsersFilter.module.scss';
import React, { useState } from 'react';
import { FilterFieldCheckbox } from './FilterFieldCheckbox';
import { UserFilterHeader } from './UserFilterHeader';

export type FilterConfig = {
    name: string;
    key: string;
    filters: FilterOption[]
}

export type FilterOption = {
    value: any;
    label: string;
}

type SelectedFilters = Record<FilterConfig['key'], FilterOption['value'][]>;

type UsersFilterProps = {
    opened: boolean;
    filters: FilterConfig[];
    selectedFilters: SelectedFilters;
    onChange(selectedFilters: SelectedFilters): void
}

export function UsersFilter(props: UsersFilterProps) {
  const [openedFilters, setOpenedFilters] = useState<string[]>([]);

  function visibilityChangeHandler(key: string, value: boolean) {
    if (value) {
      return setOpenedFilters([
        ...openedFilters,
        key,
      ]);
    }
    return setOpenedFilters(openedFilters.filter(it => it !== key));
  }

  function isChecked(key: string, value: any) {
    return props.selectedFilters[key].includes(value);
  }

  function handleOnChange(key: string, value: any) {
    if (isChecked(key, value)) {
      return props.onChange({
        ...props.selectedFilters,
        [key]: props.selectedFilters[key].filter(it => it !== value),
      });
    }
    return props.onChange({
      ...props.selectedFilters,
      [key]: [
        ...props.selectedFilters[key].filter(it => it),
        value,
      ],
    });
  }

  return <div className={`${s.filter} ${props.opened ? '' : s.hidden}`}>
    <div className={s.filter_container}>
      {props.filters.map((field, i) => (
        <div key={`filter_${i}`} className={`${s.field} ${openedFilters.includes(field.key) ? s.hidden : {}}`}>
          <UserFilterHeader
            title={field.name}
            opened={openedFilters.includes(field.key)}
            onVisibilityChanged={value => visibilityChangeHandler(field.key, value)}
          />
          <div className={s.list}>
            {field.filters.map((filter, i) => {
              return <FilterFieldCheckbox
                key={i}
                label={filter.label}
                checked={isChecked(field.key, filter.value)}
                onChange={() => handleOnChange(field.key, filter.value)}
              />;
            })}

            <div className={s.divider}></div>
          </div>
        </div>
      ))}
    </div>
  </div>;
}
