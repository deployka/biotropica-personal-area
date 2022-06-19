import React, { useState } from 'react';
import classNames from 'classnames';
import { FilterFieldHeader } from '../FieldHeader/FieldHeader';
import { FilterCheckboxOption } from './CheckboxOptions';

import s from './Field.module.scss';
import { FilterField, FilterOption } from '../Filter';

type Props = {
  field: FilterField;
  selectedFields: FilterOption['value'][];
  onChange: (checkedFields: string[]) => void;
};

export const FilterCheckboxField = ({
  field,
  selectedFields,
  onChange,
}: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleChange = (value: string) => {
    if (selectedFields.includes(value) && value !== 'all') {
      if (selectedFields.length === 1) return;
      const newFields = selectedFields.filter(option => option !== value);
      return onChange(newFields);
    }

    if (selectedFields.length !== 0 && selectedFields.includes('all')) {
      const newFields = selectedFields.filter(option => option !== 'all');
      return onChange([...newFields, value]);
    }

    if (value === 'all') {
      return onChange(['all']);
    }

    return onChange([...selectedFields, value]);
  };

  return (
    <div className={classNames(s.field, { [s.hidden]: isOpened })}>
      <FilterFieldHeader
        title={field.name}
        onChangeVisibility={() => setIsOpened(!isOpened)}
        isOpened={isOpened}
      />
      <div className={s.list}>
        {field.filters.map((option, i) => {
          return (
            <FilterCheckboxOption
              key={i}
              groupName={field.key}
              label={option.label}
              checked={selectedFields.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
          );
        })}

        <div className={s.divider}></div>
      </div>
    </div>
  );
};
