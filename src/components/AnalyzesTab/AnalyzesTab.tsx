import React, { useState } from 'react';
import type { CreateAnalyzeAnswerDto } from '../../@types/dto/analyzes/create.dto';
import type { AnalyzeAnswer } from '../../@types/entities/AnalyzeAnswer';
import type { Analyze } from '../../@types/entities/Analyze';

import { IInfoBar, InfoBar } from '../../shared/Global/InfoBar/InfoBar';
import { AnalyzesAddModal } from './AddModal/AddModal';
import { AnalyzesHeader } from './Header/Header';
import { AnalyzeTypes } from './Types/Types';
import { AnalyzesList } from './List/List';

import s from './AnalyzesTab.module.scss';

interface Props {
  isEditable?: boolean;
  isAccess?: boolean;
  isAnalyzesLoading: boolean;
  isAddAnalyzeLoading: boolean;
  analyzes: AnalyzeAnswer[];
  analyzeTypes: Analyze[];
  isLoadingComment?: boolean;
  onAddAnalyze: (values: CreateAnalyzeAnswerDto) => void;
  onDeleteAnalyze: (id: number) => void;
  onAddComment: (comment: string, analyzeId: number) => void;
  onDeleteComment: (id: number) => void;
}

export const AnalyzesTab = ({
  isEditable = false,
  isAccess = false,
  analyzes,
  analyzeTypes,
  isAnalyzesLoading,
  isAddAnalyzeLoading,
  isLoadingComment,
  onAddAnalyze,
  onDeleteAnalyze,
  onAddComment,
  onDeleteComment,
}: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const onAddAnalyzeClick = () => {
    setIsModalOpened(true);
  };

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
    onBottomClick: () => {
      setIsModalOpened(true);
    },
  };

  if (!isAccess) return <p>Нет доступа</p>;

  if (isAnalyzesLoading) {
    return (
      <div className={s.analyzes}>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className={s.analyzes}>
      {!analyzes.length && <InfoBar infoBar={analyzesInfoBar} />}
      {!!analyzes.length && (
        <div className={s.card}>
          <AnalyzesHeader
            onAddAnalyzeClick={onAddAnalyzeClick}
            isEditable={isEditable}
          />
          <AnalyzeTypes analyzeTypes={analyzeTypes} />
          <AnalyzesList
            onDelete={onDeleteAnalyze}
            analyzes={analyzes}
            isEditable={isEditable}
            isLoadingComment={isLoadingComment}
            onAddComment={onAddComment}
            onDeleteComment={onDeleteComment}
          />
        </div>
      )}

      <AnalyzesAddModal
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        onSubmit={onAddAnalyze}
        isLoading={isAddAnalyzeLoading}
      />
    </div>
  );
};
