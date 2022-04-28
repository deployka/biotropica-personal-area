import React, { RefObject, useState } from 'react';
import s from './Header.module.scss';
import MoreIcon from '../../assets/icons/global/more.svg';
import Divider from '../Divider/Divider';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import { CreateSomeTask } from '../../store/@types/Task';

interface MoreOptionsButtonProps {
  taskId: string;
  saveTemplate: (task: Partial<CreateSomeTask>) => void;
  onDelete: () => void;
  formikRef: RefObject<FormikProps<Partial<CreateSomeTask>>>;
}

export function MoreOptionsButton(props: MoreOptionsButtonProps) {
  const { taskId, onDelete, saveTemplate } = props;

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const openContextMenu = () => {
    setIsContextMenuVisible(true);
  };

  const closeContextMenu = () => {
    setIsContextMenuVisible(false);
  };

  const handleClickSaveTemplate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    closeContextMenu();
    const isDirty = props.formikRef.current?.dirty;
    const isValid = props.formikRef.current?.isValid;
    const values = props.formikRef.current?.values;
    console.log(isValid, isDirty);

    if (values && isValid && isDirty) {
      saveTemplate(values);
      props.formikRef.current?.resetForm();
      return;
    }
    props.formikRef.current?.submitForm();
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
            <button
              onMouseDown={handleClickSaveTemplate}
              className={s.contextMenuOption}
            >
              Сохранить как шаблон
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
