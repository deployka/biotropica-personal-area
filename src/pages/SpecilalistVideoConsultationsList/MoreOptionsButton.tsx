import React, { useState } from 'react';
import s from './VideoConsultationsList.module.scss';
import MoreIcon from '../../assets/icons/dots-horizontal.svg';
import Divider from '../../components/Divider/Divider';

interface MoreOptionsButtonProps {
  consultationId: number,
  showSetDateTimeModal: (id: number) => void,
  showDeleteModal: (id: number) => void,
  isMovable: boolean;
  goToConsultation: (id: number) => void,
}

export function MoreOptionsButton(props: MoreOptionsButtonProps) {
  const {
    consultationId,
    showSetDateTimeModal,
    showDeleteModal,
    goToConsultation,
    isMovable,
  } = props;

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const openContextMenu = () => {
    setIsContextMenuVisible(true);
  };

  const closeContextMenu = () => {
    setIsContextMenuVisible(false);
  };

  const handleGoToConsultation = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    closeContextMenu();
    goToConsultation(consultationId);
  };

  const handleClickSetDateTime = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    closeContextMenu();
    showSetDateTimeModal(consultationId);
  };

  const handleClickDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    closeContextMenu();
    showDeleteModal(consultationId);
  };

  return (
    <>
      <div className={s.moreOptions}>
        <button
          className={s.moreOptionsBtn}
          onClick={openContextMenu}
          onBlur={closeContextMenu}
        >
          <img src={MoreIcon} alt='more' />
        </button>
        {
          isContextMenuVisible &&
              <div className={s.contextMenu}>
                {isMovable
                  ? <button onMouseDown={handleGoToConsultation} className={s.contextMenuOption}>
                      Перейти
                  </button>
                  : ''}
                <button onMouseDown={handleClickSetDateTime} className={s.contextMenuOption}>
                  Изменить дату и время
                </button>
                <Divider />
                <button onMouseDown={handleClickDelete} className={s.contextMenuOption}>
                  Удалить консультацию
                </button>
              </div>
        }
      </div>
    </>
  );
}
