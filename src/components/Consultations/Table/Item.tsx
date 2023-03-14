import React from 'react';

import moment from 'moment';
import s from './Table.module.scss';

type Props = {
  date: Date | null;
  specialistName?: string;
  action?: {
    onClick: () => void;
    text: string;
  };
};

export const ConsultationTableItem = ({
  date,
  action,
  specialistName,
}: Props) => {
  return (
    <tr className={s.tableRow}>
      <td>{date ? moment(date).format('LL') : 'укажет специалист'}</td>
      <td>{date ? moment(date).format('LT') : 'укажет специалист'}</td>
      <td>{specialistName}</td>
      <td
        style={{
          cursor: 'pointer',
          color: '#6f61d0',
          textAlign: 'right',
        }}
        onClick={action?.onClick}
      >
        {action?.text}
      </td>
    </tr>
  );
};
