import React, { useState } from 'react';

import { eventBus, EventTypes } from '../../services/EventBus';
import { useBlockUserMutation, useGetAllUsersQuery } from '../../api/user';

import { useGetAllRolesQuery } from '../../api/roles';
import { BaseUser } from '../../@types/entities/BaseUser';
import { useCreateDialogMutation } from '../../api/chat';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { ResponseError } from '../../@types/api/response';
import { AdminUsersList } from '../../components/AdminUsers/List/List';
import { CreateUserModal } from '../../components/AdminUsers/CreateModal/CreateModal';
import { BlockUserConfirmModal } from '../../components/AdminUsers/BlockModal/BlockUserModal';
import { useSignUpMutation } from '../../api/auth';
import { Role, ROLE } from '../../@types/entities/Role';
import { CreateUserDto } from '../../@types/dto/users/create-user.dto';

export function AdminUsers() {
  const [popup, setPopup] = useState<boolean>(false);
  const [blockUserModalOpened, setBlockUserModalOpened] =
    useState<boolean>(false);
  const [userToBlock, setUserToBlock] = useState<BaseUser | null>(null);
  const [signUp, { isLoading: isCreateUserLoading }] = useSignUpMutation();
  const [blockUser] = useBlockUserMutation();
  const [createDialog] = useCreateDialogMutation();

  const { data: users } = useGetAllUsersQuery({});
  const { data: roles } = useGetAllRolesQuery();

  function askBlockUser(user: BaseUser) {
    setUserToBlock(user);
    setBlockUserModalOpened(true);
  }

  async function writeUser(user: BaseUser) {
    try {
      const dialog = await createDialog({
        userId: user.id as number,
        title: 'Техподдержка',
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

  function getRoleKeyByName(role: ROLE) {
    switch (role) {
      case ROLE.ADMIN:
        return process.env.REACT_APP_ROLE_ADMIN;
      case ROLE.SPECIALIST:
        return process.env.REACT_APP_ROLE_SPECIALIST;
      default:
        return process.env.REACT_APP_ROLE_CLIENT;
    }
  }

  async function createUserHandler(user: CreateUserDto) {
    try {
      const role = getRoleKeyByName(user.roles[0]);
      await signUp({ ...user, role: role || '' }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Ссылка для создания пароля успешно отправлена!',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: (error as ResponseError)?.data.message,
        type: NotificationType.DANGER,
      });
    }
    setPopup(false);
  }

  async function handleBlockUser() {
    if (!userToBlock?.id) {
      return;
    }
    await blockUser(userToBlock.id);
    setBlockUserModalOpened(false);
  }

  return (
    <div>
      <CreateUserModal
        isLoading={isCreateUserLoading}
        popup={popup}
        setPopup={setPopup}
        roles={roles || []}
        onUserCreate={createUserHandler}
      />
      <BlockUserConfirmModal
        opened={blockUserModalOpened}
        onDisagreed={() => setBlockUserModalOpened(false)}
        onAgreed={handleBlockUser}
      />
      {users ? (
        <AdminUsersList
          users={users}
          onCreateUser={() => setPopup(true)}
          onWriteUser={(user: BaseUser) => writeUser(user)}
          onBlockUser={(user: BaseUser) => askBlockUser(user)}
        />
      ) : (
        ''
      )}
    </div>
  );
}
