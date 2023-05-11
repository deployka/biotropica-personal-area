import React, { useState } from 'react';
import { useHistory } from 'react-router';
import type { BaseUser } from '../../@types/entities/BaseUser';

import { getFullName } from '../../utils/getFullName';
import { UsersListTabHeader } from './Header/Header';
import { SpecialistListTabItem } from './Item/Item';
import { filterUserByQuery } from './usersListHelper';

import s from './Tab.module.scss';

type Props = {
  isLoading?: boolean;
  isError?: boolean;
  specialists: {user: BaseUser, subscribeId: number}[];
  handleRejectClick: (id:number) => void;
};

export const SpecialistListTab = ({ specialists, isLoading, isError, handleRejectClick }: Props) => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClick = (user: BaseUser) => {
    history.push(`/specialists/${user?.specialist?.id}`);
  };

  const filteredSpecialists = specialists.filter(specialist =>
    filterUserByQuery(specialist.user, searchQuery),
  );

  if (isLoading) return <p>Загрузка...</p>;

  if (!isLoading && isError) return <p>Произошла ошибка</p>;
  return (
    <div className={s.users}>
      <UsersListTabHeader
        query={searchQuery}
        usersCount={specialists.length}
        onChange={setSearchQuery}
      />
      {filteredSpecialists.map(({ user, subscribeId }) => (
        <SpecialistListTabItem
          key={user.id}
          handleUserClick={() => handleClick(user)}
          handleRejectClick={() => handleRejectClick(subscribeId)}
          fullName={getFullName(user.name, user.lastname)}
        />
      ))}
      {filteredSpecialists.length === 0 && (
        <div className={s.notFound}>Специалисты не найдены</div>
      )}
    </div>
  );
};
