import React, { useState } from 'react';
import { AnalyzesCard } from './Card/Card';
import { IInfoBar, InfoBar } from '../../shared/Global/InfoBar/InfoBar';
import { CreateAnalyzeAnswerDto } from '../../@types/dto/analyzes/create.dto';
import { AnalyzesAddModal } from './AddModal/AddModal';
import { AnalyzeAnswer } from '../../@types/entities/AnalyzeAnswer';
import { Analyze } from '../../@types/entities/Analyze';

import s from './Analyzes.module.scss';

interface Props {
  isAnalyzesLoading: boolean;
  isAddAnalyzeLoading: boolean;
  isModalOpen: boolean;
  analyzes: AnalyzeAnswer[];
  analyzeTypes: Analyze[];
  setIsModalOpen: (isOpen: boolean) => void;
  onAddAnalyze: (values: CreateAnalyzeAnswerDto) => void;
}

export const Analyzes = ({
  onAddAnalyze,
  isModalOpen,
  analyzes,
  analyzeTypes,
  isAnalyzesLoading,
  setIsModalOpen,
  isAddAnalyzeLoading,
}: Props) => {
  const [isShowMore, setIsShowMore] = useState(false);

  function onShowMoreClick() {
    setIsShowMore(!isShowMore);
  }

  const analyzesInfoBar: IInfoBar = {
    title: 'Вы не добавляли анализы',
    text: (
      <ul>
        <p className={s.text}>
          •{' '}
          <span className={s.answer}>
            Общеклинический анализ крови с лейкоцитами
          </span>
        </p>
        <p className={s.text}>
          •{' '}
          <span className={s.answer}>
            Биохимический анализ крови (включает параметры функции печени: АЛТ,
            АСТ, ГГТ, щелочная фосфатаза)
          </span>
        </p>
      </ul>
    ),
    bottomLink: 'Загрузить анализы',
    onClick: () => {
      setIsModalOpen(true);
    },
  };

  if (isAnalyzesLoading) {
    return (
      <div className={s.analyzes}>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <>
      <div className={s.analyzes}>
        {analyzes.length ? (
          <AnalyzesCard
            analyzeTypes={analyzeTypes}
            onAddAnalyzeClick={() => setIsModalOpen(true)}
            analyzes={analyzes}
            onShowMoreClick={onShowMoreClick}
            isShowMore={isShowMore}
          />
        ) : (
          <InfoBar infoBar={analyzesInfoBar} />
        )}
      </div>
      {/* FIXME: вынести isOpen внутрь модалки */}
      {isModalOpen && (
        <AnalyzesAddModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onAddAnalyze}
          isLoading={isAddAnalyzeLoading}
        />
      )}
    </>
  );
};
