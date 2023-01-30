import React from 'react';

import { ConsultationTableItem } from './Item';

import { Specialist } from '../../../@types/entities/Specialist';
import { Consultation } from '../../../@types/entities/Consultation';

import s from './Table.module.scss';

type Props = {
  mode: 'active' | 'withoutData' | 'inactive';
  specialists: Specialist[];
  consultationsList: Consultation[];
  moveToConsultation: (id: number) => void;
  onSendMessage: (userId: number) => void;
};

export const ConsultationTableItemGroup = ({
  mode,
  consultationsList,
  specialists,
  moveToConsultation,
  onSendMessage,
}: Props) => {
  return (
    <>
      {consultationsList.length !== 0 ? (
        consultationsList.map(consultation => (
          <ConsultationTableItem
            key={consultation.id}
            // TODO: проверить
            date={consultation.date ? new Date(consultation.date) : null}
            specialistName={
              specialists.find(s => s.id === consultation.specialistId)?.user
                .name
            }
            action={
              mode !== 'inactive' &&
              (consultation.isPaid || consultation.isFree)
                ? {
                    onClick:
                      mode === 'active'
                        ? () => moveToConsultation(consultation.id)
                        : () =>
                            onSendMessage(
                              specialists.find(
                                s => s.id === consultation.specialistId,
                              )?.user.id || 0,
                            ),
                    text: mode === 'active' ? 'перейти' : 'открыть диалог',
                  }
                : undefined
            }
          />
        ))
      ) : (
        <tr className={s.tableRow}>
          <td className={s.tableNoData}>Нет данных</td>
        </tr>
      )}
    </>
  );
};
