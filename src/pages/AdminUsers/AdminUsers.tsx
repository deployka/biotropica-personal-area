import { CreateUserModal } from './components/CreateUserModal/CreateUserModal';
import React, { useState } from 'react';
import { BlockUserConfirmModal } from './components/BlockUserConfirmModal';
import { UserList } from './components/UserList/UserList';
import { eventBus, EventTypes } from '../../services/EventBus';
import {
  useBlockUserMutation,
  useCreateUserMutation,
  useGetAllUsersQuery,
} from '../../store/rtk/requests/user';
import ChatService from '../../services/ChatService';
import { useGetAllRolesQuery } from '../../store/rtk/requests/roles';
import { User } from '../../store/rtk/types/user';

export function AdminUsers() {
  const [popup, setPopup] = useState<boolean>(false);
  const [blockUserModalOpened, setBlockUserModalOpened] =
    useState<boolean>(false);
  const [userToBlock, setUserToBlock] = useState<User | null>(null);
  const [createUser] = useCreateUserMutation();
  const [blockUser] = useBlockUserMutation();

  const { data: users } = useGetAllUsersQuery();
  const { data: roles } = useGetAllRolesQuery();

  function askBlockUser(user: User) {
    setUserToBlock(user);
    setBlockUserModalOpened(true);
  }

  async function writeUser(user: User) {
    const { data: dialog } = await ChatService.createDialog(
      user.id as number,
      'Техподдержка',
    );
    eventBus.emit(EventTypes.chatOpen, dialog.id);
  }

  async function createUserHandler(user: User) {
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
          onWriteUser={(user: User) => writeUser(user)}
          onBlockUser={(user: User) => askBlockUser(user)}
        />
      ) : (
        ''
      )}
    </div>
  );
}
