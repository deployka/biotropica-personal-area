import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { ProgressCard } from "./ProgressCard/ProgressCard";

import s from "./Progress.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectProgressData } from "../../../../store/ducks/progress/selectors";
import { Progress as IProgress } from "../../../../store/ducks/progress/contracts/state";
import { useEffect } from "react";
import { fetchProgressData } from "../../../../store/ducks/progress/actionCreators";
import { IInfoBar, InfoBar } from "../../../../shared/Global/InfoBar/InfoBar";
import { ModalName } from "../../../../providers/ModalProvider";
import { useModal } from "../../../../hooks/UseModal";

interface Props {}

export const Progress = ({}: Props) => {
  const dispatch = useDispatch();

  const { openModal } = useModal();

  const infoBar: IInfoBar = {
    title: "У вас нет загруженного прогресса",
    text: "Вы еще не загружили фото прогресса. Сделайте это нажав на ссылку ниже",
    bottomLink: "Загрузить фото",
    onClick: () => {
      openModal(ModalName.MODAL_ADD_PROGRESS_PHOTO);
    },
  };

  const progress: IProgress[] = useSelector(selectProgressData) || [];
  useEffect(() => {
    dispatch(fetchProgressData());
  }, []);
  return (
    <>
      <PerfectScrollbar>
        <div className={s.progress}>
          {!!progress.length &&
            progress.map((card: IProgress) => (
              <ProgressCard key={card.id} card={card} />
            ))}
          {!progress.length && <InfoBar infoBar={infoBar} />}
        </div>
      </PerfectScrollbar>
    </>
  );
};
