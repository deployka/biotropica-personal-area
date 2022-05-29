import React from 'react';
import { useField } from 'formik';
import Select from 'react-select';

import styles from './MultiSelectStyles';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export interface SpecializationOption {
  readonly value: string;
  readonly label: string;
}

export const SpecializationOptions: readonly SpecializationOption[] = [
  { value: 'TRAINER', label: 'Тренер' },
  { value: 'NUTRITIONIST', label: 'Диетолог' },
  { value: 'NUTRITSIOLOG', label: 'Нутрициолог' },
  { value: 'ENDOCRINOLOGIST', label: 'Эндокринолог' },
  { value: 'PEDIATRICIAN', label: 'Педиатр' },
  { value: 'TRAUMATOLOGIST_ORTHOPEDIST', label: 'Травматолог-ортопед' },
  { value: 'THERAPIST', label: 'Терапевт' },
  { value: 'PHYSICIAN', label: 'Врач ЛФК и спортивной медицины' },
  { value: 'ALLERGIST_IMMUNOLOGIST', label: 'Аллерголог-иммунолог' },
];

export interface Props {
  // eslint-disable-next-line
  value: any;
  options: typeof SpecializationOptions;
  name: string;
  classes?: string;
  placeholder: string;
  onBlur: (e: React.FocusEvent<HTMLElement>) => void;
  // eslint-disable-next-line
  onChange: (selected: any) => void;
}

const MultiSelect = (props: Props) => {
  const {
    name,
    value,
    options,
    placeholder,
    onBlur,
    onChange,
  } = props;

  const [field, meta] = useField(props);

  return (
    <div style={{ position: 'relative' }}>
      <Label value={placeholder} />
      <Select
        isMulti
        name={name}
        value={value}
        placeholder=''
        styles={styles}
        options={options}
        onChange={onChange}
        onBlur={onBlur}
      />
      {
        meta.error &&
          <ErrorMessage message={meta.error} />
      }
    </div>
  );
};

export default MultiSelect;
