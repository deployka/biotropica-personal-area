import React, { useState } from 'react';
import classNames from 'classnames';
import { FilterFieldHeader } from '../FieldHeader/FieldHeader';
import { FilterRadioOption } from './RadionOption';
import { FilterField, FilterOption } from '../Filter';

import s from './Field.module.scss';

type Props = {
  field: FilterField;
  selectedFields: FilterOption['value'][];
  onChange: (checkedFields: string[]) => void;
};

export const FilterRadioField = ({
  field,
  selectedFields,
  onChange,
}: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleChange = (value: string) => {
    onChange([value]);
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
            <FilterRadioOption
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
