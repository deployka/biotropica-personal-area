import React, { useState } from 'react';

import { eventBus, EventTypes } from '../../services/EventBus';
import {
  useBanUserMutation,
  useGetAllUsersQuery,
  useUnbanUserMutation,
} from '../../api/user';

import { useGetAllRolesQuery } from '../../api/roles';
import { BaseUser } from '../../@types/entities/BaseUser';
import { useCreateDialogMutation } from '../../api/chat';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { ResponseError } from '../../@types/api/response';
import { AdminUsersList } from '../../components/AdminUsers/List/List';
import { CreateUserModal } from '../../components/AdminUsers/CreateModal/CreateModal';
import { BanStatusModal } from '../../components/AdminUsers/BanStatusModal/BanStatusModal';
import { useSignUpMutation } from '../../api/auth';
import { ROLE } from '../../@types/entities/Role';
import { CreateUserDto } from '../../@types/dto/users/create-user.dto';
import { useHistory } from 'react-router';
import { useGetAllTariffsQuery } from '../../api/tariffs';
import {
  errorBanNotification,
  errorCreateUserNotification,
  errorUnbanNotification,
  successBanNotification,
  successCreateUserNotification,
  successUnbanNotification,
} from './adminUsersNotifications';

export function AdminUsers() {
  const history = useHistory();
  const [popup, setPopup] = useState<boolean>(false);
  const [blockUserModalMode, setBlockUserModalMode] = useState<
    'block' | 'unblock' | null
  >(null);
  const [blockedUserId, setBlockedUserId] = useState<number | null>(null);
  const [signUp, { isLoading: isCreateUserLoading }] = useSignUpMutation();
  const [banUser] = useBanUserMutation();
  const [unbanUser] = useUnbanUserMutation();
  const [createDialog] = useCreateDialogMutation();
  const { data: tariffs = [] } = useGetAllTariffsQuery();

  const { data: users } = useGetAllUsersQuery({});
  const { data: roles } = useGetAllRolesQuery();

  const moveToProfile = (user: BaseUser) => {
    const specialistId = user.specialist?.id;
    if (specialistId) {
      history.push(`/specialists/${specialistId}`);
    } else {
      history.push(`/users/${user.id}`);
    }
  };

  const toggleUserBanStatus = (id: number) => {
    const user = users?.find(it => it.id === id);
    if (!user) return;

    setBlockUserModalMode(user.banned ? 'unblock' : 'block');
    setBlockedUserId(id);
  };

  async function writeUser(userId: number) {
    try {
      const dialog = await createDialog({
        userId,
        title: 'Техподдержка',
        isAccess: true,
      }).unwrap();
      eventBus.emit(EventTypes.chatOpen, dialog.id);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as ResponseError).data.message,
        type: NotificationType.DANGER,
      });
    }
  }

  const getRoleKeyByName = (role: ROLE) => {
    switch (role) {
      case ROLE.ADMIN:
        return process.env.REACT_APP_ROLE_ADMIN;
      case ROLE.SPECIALIST:
        return process.env.REACT_APP_ROLE_SPECIALIST;
      default:
        return process.env.REACT_APP_ROLE_CLIENT;
    }
  };

  const handleCreateUser = async (user: CreateUserDto) => {
    try {
      const role = getRoleKeyByName(user.roles[0]);
      await signUp({ ...user, role: role || '' }).unwrap();
      successCreateUserNotification();
    } catch (error) {
      console.error(error);
      errorCreateUserNotification(error as ResponseError);
    }
    setPopup(false);
  };

  const handleBlockUser = async (banReason: string) => {
    if (!blockedUserId) {
      return;
    }

    try {
      await banUser({ id: blockedUserId, banReason }).unwrap();
      successBanNotification();
      setBlockUserModalMode(null);
      setBlockedUserId(null);
    } catch (error) {
      console.log(error);
      errorBanNotification();
    }
  };

  const handleUnblockUser = async () => {
    if (!blockedUserId) {
      return;
    }

    try {
      await unbanUser({ id: blockedUserId }).unwrap();
      successUnbanNotification();
      setBlockUserModalMode(null);
      setBlockedUserId(null);
    } catch (error) {
      console.log(error);
      errorUnbanNotification();
    }
  };

  return (
    <div>
      <CreateUserModal
        isLoading={isCreateUserLoading}
        popup={popup}
        setPopup={setPopup}
        roles={roles || []}
        onUserCreate={handleCreateUser}
      />
      <BanStatusModal
        isOpened={!!blockUserModalMode}
        type={blockUserModalMode}
        onReject={() => setBlockUserModalMode(null)}
        onBlock={handleBlockUser}
        onUnblock={handleUnblockUser}
      />
      {users ? (
        <AdminUsersList
          users={users}
          tariffs={tariffs}
          onProfile={moveToProfile}
          onCreateUser={() => setPopup(true)}
          onWriteUser={writeUser}
          onToggleUserBanStatus={toggleUserBanStatus}
        />
      ) : (
        ''
      )}
    </div>
  );
}
