import React from 'react';
import { Consultation } from '../../../@types/entities/Consultation';
import { Specialist } from '../../../@types/entities/Specialist';
import { ConsultationTableItemGroup } from './ItemsGroup';

import s from './Table.module.scss';

type Props = {
  specialists: Specialist[];
  activeConsultations: Consultation[];
  consultationsWithoutData: Consultation[];
  inactiveConsultations: Consultation[];
  moveToConsultation: (id: number) => void;
  onSendMessageClick: (userId: number | undefined) => void;
  sendMessage: (userId: number) => void;
};

export const ConsultationsTable = ({
  activeConsultations,
  specialists,
  consultationsWithoutData,
  inactiveConsultations,
  moveToConsultation,
  onSendMessageClick,
  sendMessage,
}: Props) => {
  return (
    <table className={s.table}>
      <tr className={s.tableHeaderRow}>
        <th>Дата</th>
        <th>Время</th>
        <th>Специалист</th>
        <th></th>
      </tr>
      <ConsultationTableItemGroup
        mode="active"
        specialists={specialists}
        consultationsList={activeConsultations}
        moveToConsultation={moveToConsultation}
        onSendMessageClick={onSendMessageClick}
      />
      <tr className={s.tableHeaderRow}>
        <th>Без даты</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <ConsultationTableItemGroup
        mode="withoutData"
        specialists={specialists}
        consultationsList={consultationsWithoutData}
        moveToConsultation={moveToConsultation}
        onSendMessageClick={onSendMessageClick}
      />
      <tr className={s.tableHeaderRow}>
        <th>Прошедшие</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <ConsultationTableItemGroup
        mode="inactive"
        specialists={specialists}
        consultationsList={inactiveConsultations}
        moveToConsultation={moveToConsultation}
        onSendMessageClick={onSendMessageClick}
      />
    </table>
  );
};
