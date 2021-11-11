import { User } from "../../../../store/ducks/user/contracts/state";
import { TestsCard } from "./TestsCard/TestsCard";
import s from "./TestsAndAnalyze.module.scss";
import { AnalyzesCard } from "./AnalyzesCard/AnalyzesCard";
import { IInfoBar, InfoBar } from "../../../../shared/Global/InfoBar/InfoBar";
import { AddAnalyzeModal } from "./AddAnalyzeModal/AddAnalyzeModal";
import { ModalName } from "../../../../providers/ModalProvider";
import { useModal } from "../../../../hooks/useModal";

interface Props {
  user: User;
}

export interface Analyze {
  info: string;
  fileName: string;
  link: string;
  createdAt: string;
}

export interface Tests {
  info: string;
  fileName: string;
  link: string;
  createdAt: string;
}

export const TestsAndAnalyze = ({ user }: Props) => {
  const { openModal } = useModal();

  const tests = {
    age: "20",
    plans: "бегу, плаванию",
    asthma: "нет",
    diabetes: "нет",
    updateUrl: "upd8271389",
  };
  const analyzes: Analyze[] = [
    {
      link: "upd8271389",
      info: "Общеклинический анализ крови с лейкоцитами;",
      fileName: "анализ крови с лейкоцитами",
      createdAt: "15 июня",
    },
    {
      createdAt: "15 марта",
      link: "doc21243123",
      info: "Биохимический анализ крови(включает параметры функции печени: АЛТ, ФСЕ,ГГТ, щелочная фосфатаза",
      fileName: "Биохимический анализ крови",
    },
  ];

  const testInfoBar: IInfoBar = {
    title: "Вы не заполняли анкету",
    text: "Пожалуйста, заполните анкету",
    href: "test",
    bottomLink: "Заполнить анкету",
  };

  const analyzesInfoBar: IInfoBar = {
    title: "Вы не добавляли анализы",
    text: "У вас нет загруженных анилизов.",
    bottomLink: "Загрузить анализы",
    onClick: () => {
      openModal(ModalName.MODAL_ADD_ANALYZ_FILE);
    },
  };

  return (
    <div className={s.tests__and__analyze}>
      {/* <TestsCard tests={tests} />
      <AnalyzesCard analyzes={analyzes} /> */}
      <InfoBar infoBar={testInfoBar} />
      <InfoBar infoBar={analyzesInfoBar} />
    </div>
  );
};
