import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { Param } from '../Edit/Edit';
import { Tab } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';
import { useGetGoalsQuery } from '../../../api/goals';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { QuestionnaireTab } from '../../../components/QuestionnaireTab/QuestionnaireTab';
import { useGetQuestionnaireAnswersQuery } from '../../../api/user';
import {
  useCreateAnalyzeAnswerCommentMutation,
  useDeleteAnalyzeAnswerCommentMutation,
  useGetAnalyzeAnswersQuery,
} from '../../../api/analyze-answers';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { useGetAnalyzesQuery } from '../../../api/analyzes';
import { useGetUserTariffByIdQuery } from '../../../api/tariffs';
import { ClientProfileLayout } from '../../../components/ProfileLayout/Client/Client';
import { useGetProgressPostsQuery } from '../../../api/progress';
import { ProgressTabPublic } from '../../../components/ProgressTab/ProgressTabPublic';
import { AnalyzesTabPublic } from '../../../components/AnalyzesTab/AnalyzesTabPublic';
import { selectCurrentUser } from '../../../store/slices/authSlice';

import s from './Public.module.scss';
import { useCreateDialogMutation } from '../../../api/chat';
import { triggerNotification } from '../../../utils/notifications';
import { useAppSelector } from '../../../store/storeHooks';

type Props = {
  user: BaseUser;
};

const tabs: Tab[] = [
  {
    key: 'analyzes',
    value: 'Анализы',
  },
  {
    key: 'questionnaire',
    value: 'Тестирование',
  },
  {
    key: 'progress',
    value: 'Прогресс',
  },
];

const ClientProfilePublic = ({ user }: Props) => {
  const userId = user.id;
  const [createDialog] = useCreateDialogMutation();

  const { data: goals = [] } = useGetGoalsQuery();

  const { active } = useParams<Param>();

  const history = useHistory();

  const [activeTab, setActiveTab] = useState(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

  const currentUser = useAppSelector(selectCurrentUser);

  const [createComment, { isLoading: isCreateCommentLoading }] =
    useCreateAnalyzeAnswerCommentMutation();
  const [deleteComment] = useDeleteAnalyzeAnswerCommentMutation();

  const { data: tariff } = useGetUserTariffByIdQuery(userId);

  const {
    data: questionnaireAnswers = [],
    isLoading: isQuestionnaireAnswersLoading,
  } = useGetQuestionnaireAnswersQuery(userId, {
    skip: activeTab !== tabs[1].key,
  });
  const { data: analyzeTypes = [], isLoading: isAnalyzesTypesLoading = false } =
    useGetAnalyzesQuery(undefined, { skip: activeTab !== tabs[0].key });
  const { data: progressPosts = [], isLoading: isProgressLoading } =
    useGetProgressPostsQuery({
      userId,
    });

  const { data: analyzes = [], isLoading: isAnalyzesLoading = false } =
    useGetAnalyzeAnswersQuery(
      {
        userId,
      },
      { skip: activeTab !== tabs[0].key },
    );

  const onAddComment = async (comment: string, analyzeId: number) => {
    try {
      await createComment({
        text: comment,
        analyzeAnswerId: analyzeId,
      }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Комментарий добавлен!',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.error(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка, попробуйте еще раз!',
        type: NotificationType.DANGER,
      });
    }
  };

  const onDeleteComment = async (id: number) => {
    try {
      await deleteComment({ id }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Комментарий удален',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка, попробуйте еще раз!',
        type: NotificationType.DANGER,
      });
    }
  };

  const startChat = async () => {
    if (!userId) return;
    try {
      const dialog = await createDialog({
        userId: user.id,
        isAccess: true,
      }).unwrap();
      eventBus.emit(EventTypes.chatOpen, dialog.id);
    } catch (error) {
      triggerNotification('Ошибка при создании чата', NotificationType.DANGER);
    }
  };

  const onTabClick = (tab: string) => {
    history.push(`/users/${userId}/tabs/${tab}`);
  };

  const onMoveToTasksClick = () => {
    history.push(`/users/${userId}/tasks`);
  };

  useEffect(() => {
    if (active) {
      setActiveTab(getTabByKey(active, tabs)?.key || activeTab);
      history.push(
        `/users/${userId}/tabs/${getTabByKey(active, tabs)?.key || activeTab}`,
      );
    }
  }, [active]);

  return (
    <>
      <ClientProfileLayout
        isPublic={true}
        user={user}
        goalsCount={goals.length}
        currentTariff={tariff}
        tabs={tabs}
        activeTab={activeTab}
        onActiveTabChange={onTabClick}
        onMoveToTasks={onMoveToTasksClick}
        onChatClick={startChat}
      >
        <div className={s.content}>
          {activeTab === tabs[0].key && (
            <AnalyzesTabPublic
              currentUserId={currentUser?.id || 0}
              isAccess={true}
              isEditable={false}
              isAnalyzesLoading={isAnalyzesTypesLoading || isAnalyzesLoading}
              analyzes={analyzes}
              analyzeTypes={analyzeTypes}
              isLoadingComment={isCreateCommentLoading}
              onAddComment={onAddComment}
              onDeleteComment={onDeleteComment}
            />
          )}
          {activeTab === tabs[1].key && (
            <QuestionnaireTab
              isAccess={true}
              isLoading={isQuestionnaireAnswersLoading}
              isPublic={false}
              answers={questionnaireAnswers}
            />
          )}
          {activeTab === tabs[2].key && (
            <ProgressTabPublic
              isLoading={isProgressLoading}
              progressPosts={progressPosts}
            />
          )}
        </div>
      </ClientProfileLayout>
    </>
  );
};

export default ClientProfilePublic;
