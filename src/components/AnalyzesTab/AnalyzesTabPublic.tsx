import React from 'react';
import type { AnalyzeAnswer } from '../../@types/entities/AnalyzeAnswer';
import type { Analyze } from '../../@types/entities/Analyze';

import { IInfoBar, InfoBar } from '../../shared/Global/InfoBar/InfoBar';

import { AnalyzeTypes } from './Types/Types';
import { AnalyzesList } from './List/List';

import s from './AnalyzesTab.module.scss';
import classNames from 'classnames';

type Props = {
  currentUserId: number;
  isEditable?: boolean;
  isAccess?: boolean;
  isLoadingComment?: boolean;
  isAnalyzesLoading: boolean;
  analyzes: AnalyzeAnswer[];
  analyzeTypes: Analyze[];
  onAddComment: (comment: string, analyzeId: number) => void;
  onDeleteComment: (id: number) => void;
};

const analyzesInfoBar: IInfoBar = {
  title: 'Пользователь не добавлял анализы',
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
};

export const AnalyzesTabPublic = ({
  isEditable = false,
  isAccess = false,
  currentUserId,
  analyzes,
  isLoadingComment,
  analyzeTypes,
  isAnalyzesLoading,
  onAddComment,
  onDeleteComment,
}: Props) => {
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
        <div className={classNames(s.card, s.public)}>
          <AnalyzeTypes analyzeTypes={analyzeTypes} />
          <AnalyzesList
            currentUserId={currentUserId}
            analyzes={analyzes}
            isEditable={isEditable}
            isLoadingComment={isLoadingComment}
            onAddComment={onAddComment}
            onDeleteComment={onDeleteComment}
          />
        </div>
      )}
    </div>
  );
};
