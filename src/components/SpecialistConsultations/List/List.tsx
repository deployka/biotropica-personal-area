import React from 'react';
import { SpecialistConsultationsHeader } from '../Header/Header';
import { SpecialistConsultationsEmptyItem } from '../Item/EmptyItem';
import { SpecialistConsultationsItem } from '../Item/Item';

import s from './List.module.scss';

export type SpecialistConsultation = {
  id: number;
  date: string;
  time: string;
  clientName: string;
  status: 'active' | 'inactive';
};

type Props = {
  searchQuery: string;
  totalConsultationsCount: number;
  activeConsultations: SpecialistConsultation[];
  inactiveConsultations: SpecialistConsultation[];
  onDelete: (id: number) => void;
  onEdit: (id: SpecialistConsultation) => void;
  onChangeSearchQuery: (query: string) => void;
};

export const SpecialistConsultationsList = ({
  searchQuery,
  totalConsultationsCount,
  activeConsultations,
  inactiveConsultations,
  onDelete,
  onEdit,
  onChangeSearchQuery,
}: Props) => {
  return (
    <div className={s.usersList}>
      <SpecialistConsultationsHeader
        usersCount={totalConsultationsCount}
        searchInputValue={searchQuery}
        onChangeSearchInput={onChangeSearchQuery}
      />
      <table className={s.table}>
        <tr className={s.tableHeaderRow}>
          <th>Дата</th>
          <th>Время</th>
          <th>Клиент</th>
          <th></th>
        </tr>
        {activeConsultations.map(consultation => (
          <SpecialistConsultationsItem
            key={consultation.id}
            date={consultation.date}
            time={consultation.time}
            clientName={consultation.clientName}
            onDelete={() => onDelete(consultation.id)}
            onEdit={() => onEdit(consultation)}
          />
        ))}
        {activeConsultations.length === 0 && (
          <SpecialistConsultationsEmptyItem />
        )}
        <tr className={s.tableHeaderRow}>
          <th>Прошедшие</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        {inactiveConsultations.map(consultation => (
          <SpecialistConsultationsItem
            isPast={true}
            key={consultation.id}
            date={consultation.date}
            time={consultation.time}
            clientName={consultation.clientName}
            onDelete={() => onDelete(consultation.id)}
            onEdit={() => onEdit(consultation)}
          />
        ))}
        {inactiveConsultations.length === 0 && (
          <SpecialistConsultationsEmptyItem />
        )}
      </table>
    </div>
  );
};
