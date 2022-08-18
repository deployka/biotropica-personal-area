import React, { useState } from 'react';
import classNames from 'classnames';
import dotsIcon from './../../../assets/icons/dots-horizontal.svg';
import { ItemPopup } from './ItemPopup';

import s from './Item.module.scss';

type Props = {
  date: string;
  time: string;
  clientName: string;
  isPast?: boolean;
  onDelete: () => void;
  onEdit: () => void;
};

export const SpecialistConsultationsItem = ({
  date,
  time,
  clientName,
  isPast,
  onEdit,
  onDelete,
}: Props) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const onDeleteConsultation = () => {
    onDelete();
    setIsPopupVisible(false);
  };

  const onEditConsultation = () => {
    onEdit();
    setIsPopupVisible(false);
  };

  return (
    <>
      <tr className={classNames(s.tableRow, { [s.past]: isPast })}>
        <td>{date}</td>
        <td>{time}</td>
        <td>{clientName}</td>
        <div
          className={classNames(s.moreBtn, { [s.active]: isPopupVisible })}
          onClick={() => setIsPopupVisible(true)}
        >
          <img src={dotsIcon} />
        </div>
        {isPopupVisible && (
          <ItemPopup
            isPast={isPast}
            onMove={function (): void {
              throw new Error('Function not implemented.');
            }}
            onDelete={onDeleteConsultation}
            onEdit={onEditConsultation}
          />
        )}
      </tr>
      {isPopupVisible && (
        <div
          className={s.background}
          onClick={() => setIsPopupVisible(false)}
        ></div>
      )}
    </>
  );
};
