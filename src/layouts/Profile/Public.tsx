import React from 'react';
import { useParams } from 'react-router';
import { useGetUserQuery } from '../../api/user';
import ClientProfilePublic from '../../pages/ClientProfile/Public/Public';

export const PublicProfileLayout = () => {
  const { id } = useParams<{ id: string }>();
  const userId = +id;
  console.log('userId :', userId);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserQuery(userId, { skip: !userId });

  return <>{user && <ClientProfilePublic user={user} />}</>;
};
