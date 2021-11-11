import React from "react";
import { ProfileSvgSelector } from "../../../../../assets/icons/profile/ProfileSvgSelector";
import { useModal } from "../../../../../hooks/useModal";
import { ModalName } from "../../../../../providers/ModalProvider";
import { PopupBackground } from "../../../../../shared/Global/PopupBackground/PopupBackground";

import s from "./AddAnalyzeModal.module.scss";

interface Props {}

export const AddAnalyzeModal = ({}: Props) => {
  const { closeModal, modals } = useModal();
  return (
    <>
      <div onClick={() => closeModal(ModalName.MODAL_ADD_ANALYZ_FILE)}>
        <PopupBackground open={modals.MODAL_ADD_ANALYZ_FILE.open} />
      </div>
      <form className={s.analyzeModal}>
        <div className={s.title}>
          <h2>Загрузить анализы</h2>
        </div>
        <div className={s.fileInput}>
          <input type="file" id="modalFileInput" />
          <label htmlFor="modalFileInput">
            <ProfileSvgSelector id="document" />
            <p>Загрузить анализы</p>
          </label>
        </div>
        <div className={s.buttons}>
          <button className={s.cansel}>Отмена</button>
          <button className={s.save}>Сохранить</button>
        </div>
      </form>
    </>
  );
};
