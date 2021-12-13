import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../../services/UserService';
import { Card } from '../components/Card/Card';

import s from './User.module.scss';

interface Params {
  id: string;
}

const User = () => {
  const [user, setUser] = useState<User | null>(null);

  const { id } = useParams<Params>();

  useEffect(() => {
    UserService.getOne(+id).then(({ data }) => setUser(data));
  }, []);

  return <div className={s.specialist}>{user ? <Card user={user} /> : ''}</div>;
};

export default User;
