import React from 'react';

import { Specialization } from '../../../store/rtk/requests/specializations';
import { SpecializationItem } from './../Item/Item';

import s from './List.module.scss';

export type SpecializationListProps = {
  types: {
    specialization: Specialization;
    count: number;
  }[];
  onSelect(type: Specialization): void;
  selectedType: Specialization | null;
};

export function SpecializationList({
  types,
  onSelect,
  selectedType,
}: SpecializationListProps) {
  return (
    <div className={s.recommendationTypeList}>
      {types.map(type => (
        <SpecializationItem
          key={type.specialization.key}
          selected={type.specialization.key === selectedType?.key}
          type={type}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
