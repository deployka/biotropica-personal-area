import React from 'react';
import moment from 'moment';
import { Consultation } from '../../../store/ducks/consultation/contracts/state';
import { Specialist } from '../../../store/ducks/specialist/contracts/state';
import { ConsultationTableItem } from './Item';

import s from './Table.module.scss';

type Props = {
  mode: 'active' | 'withoutData' | 'inactive';
  specialists: Specialist[];
  consultationsList: Consultation[];
  moveToConsultation: (id: number) => void;
  onSendMessageClick: (userId: number | undefined) => void;
};

export const ConsultationTableItemGroup = ({
  mode,
  consultationsList,
  specialists,
  moveToConsultation,
  onSendMessageClick,
}: Props) => {
  return (
    <>
      {consultationsList.length !== 0 ? (
        consultationsList.map(consultation => (
          <ConsultationTableItem
            key={consultation.id}
            date={consultation.date}
            specialistName={
              specialists.find(s => s.id === consultation.specialistId)?.name
            }
            action={
              mode !== 'inactive'
                ? {
                    onClick:
                      mode === 'active'
                        ? () => moveToConsultation(consultation.id)
                        : () =>
                            onSendMessageClick(
                              specialists.find(
                                s => s.id === consultation.specialistId,
                              )?.userId,
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

// onClick: () => {
//   moveToConsultation(consultation.id);
// },

// onClick={() => {
//   onSendMessageClick(
//     specialists.find(s => s.id === consultation.specialistId)
//       ?.userId,
//   );
// }}
