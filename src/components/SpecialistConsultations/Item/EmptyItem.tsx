import React from 'react';

import s from './Item.module.scss';

export const SpecialistConsultationsEmptyItem = () => {
  return (
    <tr className={s.tableRow}>
      <td className={s.tableNoData}>Нет данных</td>
    </tr>
  );
};
