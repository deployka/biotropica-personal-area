import React, { useState } from 'react';
import classNames from 'classnames';
import dotsIcon from './../../../assets/icons/dots-horizontal.svg';
import { Action, ActionMenu } from '../../UI/ActionsMenu/ActionsMenu';

import s from './Item.module.scss';

type Props = {
  date: string;
  time: string;
  clientName: string;
  isPast?: boolean;
  isMovable?: boolean;
  onMove: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const SpecialistConsultationsItem = ({
  date,
  time,
  clientName,
  isPast,
  isMovable,
  onMove,
  onEdit,
  onDelete,
}: Props) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const actions: Action[] = [
    {
      title: 'Перейти',
      onClick: () => onMove(),
      isHidden: !isMovable,
    },
    {
      title: 'Изменить дату и время',
      onClick: () => onEdit(),
      isHidden: isPast,
    },
    {
      title: 'Удалить',
      onClick: () => onDelete(),
      type: 'red',
    },
  ];

  return (
    <tr className={classNames(s.tableRow, { [s.past]: isPast })}>
      <td>{date}</td>
      <td>{time}</td>
      <td className={s.clientName}>{clientName}</td>
      <td>
        <ActionMenu
          actions={actions}
          onClose={() => setIsPopupVisible(false)}
          isOpened={isPopupVisible}
          wrapperStyles={{ position: 'absolute', right: '10px', top: '50%' }}
        >
          <div
            className={classNames(s.moreBtn, { [s.active]: isPopupVisible })}
            onClick={() => setIsPopupVisible(!isPopupVisible)}
          >
            <img src={dotsIcon} />
          </div>
        </ActionMenu>
      </td>
    </tr>
  );
};
