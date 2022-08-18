import React, { useState } from 'react';
import { Consultation } from '../../../@types/entities/Consultation';
import {
  filterConsultationByQuery,
  formatConsultation,
} from '../../../pages/SpecialistConsultations/consultationsHelper';
import { SpecialistConsultationsHeader } from '../Header/Header';
import { SpecialistConsultationsEmptyItem } from '../Item/EmptyItem';
import { SpecialistConsultationsItem } from '../Item/Item';

import s from './List.module.scss';

export type SpecialistConsultation = {
  id: number;
  date: string;
  time: string;
  clientName: string;
  meetingNumber: number;
  status: 'active' | 'inactive';
};

type Props = {
  totalConsultationsCount: number;
  consultations: Consultation[];
  onMove: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: SpecialistConsultation) => void;
};

export const SpecialistConsultationsList = ({
  totalConsultationsCount,
  consultations,
  onMove,
  onEdit,
  onDelete,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const formattedConsultationsList: SpecialistConsultation[] = consultations
    .map(consultation => formatConsultation(consultation))
    .filter(consultation =>
      filterConsultationByQuery(consultation, searchQuery),
    );

  const activeConsultations = formattedConsultationsList.filter(
    consultation => consultation.status === 'active',
  );
  const inactiveConsultations = formattedConsultationsList.filter(
    consultation => consultation.status === 'inactive',
  );

  return (
    <div className={s.usersList}>
      <SpecialistConsultationsHeader
        usersCount={totalConsultationsCount}
        searchInputValue={searchQuery}
        onChangeSearchInput={setSearchQuery}
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
            isMovable={!!consultation.meetingNumber}
            clientName={consultation.clientName}
            onMove={() => onMove(consultation.id)}
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
            isMovable={false}
            key={consultation.id}
            date={consultation.date}
            time={consultation.time}
            clientName={consultation.clientName}
            onMove={() => onMove(consultation.id)}
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
