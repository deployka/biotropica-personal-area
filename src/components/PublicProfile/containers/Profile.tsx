import React, { useState } from 'react';
import { Card } from '../components/Card/Card';
import { Tariff } from '../components/Tariff/Tariff';
import { Goals } from '../components/Goals/Goals';
import { Progress } from '../components/Progress/Progress';
import { useHistory, useParams } from 'react-router';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../GlobalNotifications/GlobalNotifications';
import classNames from 'classnames';
import { Analyze } from '../../../@types/entities/Analyze';
import { AnalyzeAnswer } from '../../../@types/entities/AnalyzeAnswer';
import { Answer } from '../../../@types/entities/Answer';
import { Progress as IProgress } from '../../../@types/entities/Progress';
import { useCreateDialogMutation } from '../../../api/chat';
import { BaseUser } from '../../../@types/entities/BaseUser';
import ChatIcon from './../../../assets/icons/ChatLight.svg';
import { PublicAnalyzes } from '../components/TestsAndAnalyze/Analyzes/Analyzes';

import s from './Profile.module.scss';
import { Test } from '../components/TestsAndAnalyze/Tests/Tests';
import { CurrentTariff } from '../../../@types/entities/Tariff';
import { UsersListTab } from '../../UsersListTab/Tab';

interface Props {
  user: BaseUser;
  specialistsList: BaseUser[];
  currentUserId: number;
  goalsLength: number;
  analyzeTypes: Analyze[];
  analyzes: AnalyzeAnswer[];
  questionnaireAnswers: Answer[];
  progress: IProgress[];
  currentTariff?: CurrentTariff;
  progressIsLoading: boolean;
  onAddComment: (comment: string, analyzeId: number) => void;
  isLoadingComment: boolean;
  onDeleteComment: (id: number) => void;
}

export interface Param {
  active: string;
}

export const Profile = ({
  user,
  goalsLength,
  questionnaireAnswers,
  analyzes,
  analyzeTypes,
  progress,
  currentUserId,
  onAddComment,
  onDeleteComment,
  isLoadingComment,
  specialistsList,
  progressIsLoading,
  currentTariff,
}: Props) => {
  const tabs: Tab[] = [
    {
      key: 'analyzes',
      value: 'Анализы',
    },
    {
      key: 'test',
      value: 'Тестирование',
    },
    {
      key: 'progress',
      value: 'Прогресс',
    },
    {
      key: 'specialists',
      value: 'Специалисты',
    },
  ];

  const { active } = useParams<Param>();
  const history = useHistory();
  const [createDialog] = useCreateDialogMutation();

  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

  function moveToTasks() {
    history.push(`/users/${user.id}/tasks`);
  }

  async function createChat() {
    if (!user) return;
    try {
      const dialog = await createDialog({
        userId: user.id,
        isAccess: true,
      }).unwrap();
      eventBus.emit(EventTypes.chatOpen, dialog.id);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка при создании чата',
        type: NotificationType.DANGER,
      });
    }
  }

  return (
    <>
      <div className={s.profile}>
        <div className={s.info}>
          <Card user={user} />
          <div className={s.userInfo}>
            <Goals goalsLength={goalsLength} />
            <Tariff
              isPaid={currentTariff?.isPaid}
              title={currentTariff?.tariff?.title}
              expires={currentTariff?.expiredAt}
            />
          </div>
          <div className={s.userActions}>
            <button className={s.button} onClick={moveToTasks}>
              Задачи и рекомендации
            </button>
            <button
              className={classNames(s.button, s.small)}
              onClick={createChat}
            >
              <img className={s.icon} src={ChatIcon} />
              <span className={s.text}>Начать чат</span>
            </button>
          </div>
        </div>
        <div className={s.content}>
          <div className={s.tabs__container}>
            <div className={s.horizontalScroll}>
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onActiveTabChanged={setActiveTab}
                spaceBetween={50}
              />
            </div>
          </div>
          {activeTab === tabs[0].key && (
            <PublicAnalyzes
              currentUserId={currentUserId}
              onDeleteComment={onDeleteComment}
              isLoadingComment={isLoadingComment}
              onAddComment={onAddComment}
              analyzes={analyzes}
              analyzeTypes={analyzeTypes}
            />
          )}
          {activeTab === tabs[1].key && (
            <Test
              onDeleteComment={onDeleteComment}
              isLoadingComment={isLoadingComment}
              onAddComment={onAddComment}
              questionnaireAnswers={questionnaireAnswers}
              analyzes={analyzes}
              analyzeTypes={analyzeTypes}
            />
          )}
          {activeTab === tabs[2].key && (
            <Progress progress={progress} isLoading={progressIsLoading} />
          )}
          {activeTab === tabs[3].key && (
            <UsersListTab users={specialistsList} />
          )}
        </div>
      </div>
    </>
  );
};
