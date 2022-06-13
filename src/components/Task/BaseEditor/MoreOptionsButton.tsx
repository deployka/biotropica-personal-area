import React, { useState } from 'react';
import s from './Header.module.scss';
import MoreIcon from '../../../assets/icons/global/more.svg';
import Divider from '../../Divider/Divider';
import classNames from 'classnames';

interface MoreOptionsButtonProps {
  taskId: string;
  onDelete: () => void;
  onCreateTemplate: () => void;
}

export function MoreOptionsButton({
  taskId,
  onDelete,
  onCreateTemplate,
}: MoreOptionsButtonProps) {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const openContextMenu = () => {
    setIsContextMenuVisible(true);
  };

  const closeContextMenu = () => {
    setIsContextMenuVisible(false);
  };

  const handleCreateTemplate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    closeContextMenu();
    onCreateTemplate();
  };

  const handleClickDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    closeContextMenu();
    onDelete();
  };

  return (
    <>
      <div className={s.moreOptions}>
        <button
          className={s.moreOptionsBtn}
          onClick={openContextMenu}
          onBlur={closeContextMenu}
        >
          <img src={MoreIcon} alt="more" />
        </button>
        {isContextMenuVisible && (
          <div className={s.contextMenu}>
            <Divider />
            <button
              onMouseDown={handleCreateTemplate}
              className={s.contextMenuOption}
            >
              Создать шаблон
            </button>
            {taskId && (
              <>
                <Divider />
                <button
                  onMouseDown={handleClickDelete}
                  className={classNames(s.contextMenuOption, s.delete)}
                >
                  Удалить задачу
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
