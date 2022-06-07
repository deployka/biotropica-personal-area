import React, { useState } from 'react';
import { CreateUserModal } from './components/CreateUserModal/CreateUserModal';
import { BlockUserConfirmModal } from './components/BlockUserConfirmModal';
import { UserList } from './components/UserList/UserList';
import { eventBus, EventTypes } from '../../services/EventBus';
import {
  useBlockUserMutation,
  useCreateUserMutation,
  useGetAllUsersQuery,
} from '../../api/user';
import { useGetAllRolesQuery } from '../../api/roles';
import { BaseUser } from '../../@types/entities/BaseUser';
import { useCreateDialogMutation } from '../../api/chat';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';

export function AdminUsers() {
  const [popup, setPopup] = useState<boolean>(false);
  const [blockUserModalOpened, setBlockUserModalOpened] =
    useState<boolean>(false);
  const [userToBlock, setUserToBlock] = useState<BaseUser | null>(null);
  const [createUser] = useCreateUserMutation();
  const [blockUser] = useBlockUserMutation();
  const [createDialog] = useCreateDialogMutation();

  const { data: users } = useGetAllUsersQuery();
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
        title: `Произошла ошибка!`,
        message: (error as { message: string }).message,
        type: NotificationType.DANGER,
      });
    }
  }

  async function createUserHandler(user: BaseUser) {
    await createUser(user);
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
        <UserList
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
