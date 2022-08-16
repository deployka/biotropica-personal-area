import React from 'react';
import { SpecialistConsultationsHeader } from '../Header/Header';

import s from './List.module.scss';

export type SpecialistConsultation = {
  id: number;
  date: string;
  time: string;
  clientName: string;
  status: 'active' | 'inactive';
};

type Props = {
  activeConsultations: SpecialistConsultation[];
  inactiveConsultations: SpecialistConsultation[];
};

export const SpecialistConsultationsList = ({
  activeConsultations,
  inactiveConsultations,
}: Props) => {
  return (
    <div className={s.usersList}>
      <SpecialistConsultationsHeader
        usersCount={0}
        onChangeSearchInput={() => console.log()}
        onSearchButtonClick={() => console.log()}
      />
      <table className={s.table}>
        <tr className={s.tableHeaderRow}>
          <th>Дата</th>
          <th>Время</th>
          <th>Клиент</th>
          <th></th>
        </tr>
        {activeConsultations.length !== 0 ? (
          activeConsultations.map(consultation => (
            <tr key={consultation.id} className={s.tableRow}>
              <td>{consultation.date}</td>
              <td>{consultation.time}</td>
              <td>{consultation.clientName}</td>
            </tr>
          ))
        ) : (
          <tr className={s.tableRow}>
            <td className={s.tableNoData}>Нет данных</td>
          </tr>
        )}
        <tr className={s.tableHeaderRow}>
          <th>Прошедшие</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        {inactiveConsultations.length !== 0 ? (
          inactiveConsultations.map(consultation => (
            <tr key={consultation.id} className={s.tableRowOfPastConsultations}>
              <td>{consultation.date}</td>
              <td>{consultation.time}</td>
              <td>{consultation.clientName}</td>
              {/* <td>
                <MoreOptionsButton
                  isMovable={!!consultation.fullData.meetingNumber}
                  consultationId={consultation.id}
                  showSetDateTimeModal={() => {
                    setConsultationToChange(consultation);
                    showSetDateTimeModal();
                  }}
                  showDeleteModal={() => {
                    setConsultationToChange(consultation);
                    showDeleteModal();
                  }}
                  goToConsultation={() => {
                    goToConsultation(consultation.id);
                  }}
                />
              </td> */}
            </tr>
          ))
        ) : (
          <tr className={s.tableRow}>
            <td className={s.tableNoData}>Нет данных</td>
          </tr>
        )}
      </table>
    </div>
  );
};
