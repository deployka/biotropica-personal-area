import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { EditPassword } from '../components/EditPassword/EditPassword';
import { EditProfileData } from '../components/EditProfileData/EditProfileData';
import { Tabs } from '../../../components/Tabs/Tabs';

import s from './Edit.module.scss';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../../../store/ducks/user/selectors';

interface Props {}

export interface Tab {
  key: string;
  value: string;
}

export const Edit = ({}: Props) => {
  const tabs: Tab[] = [
    {
      key: 'profile-data',
      value: 'Личные данные',
    },
    {
      key: 'password',
      value: 'Безопасность',
    },
  ];
  const location = useLocation();
  const history = useHistory();

  const user = useSelector(selectUserData);

  const editPath = location?.search.split('?')[1];
  const [activeTab, setActiveTab] = useState<string>(editPath || tabs[0].key);

  useEffect(() => {
    history.push(`${location.pathname}?${activeTab}`);
  }, [activeTab]);

  return (
    <div className={s.edit__profile}>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === tabs[0].key && user && <EditProfileData user={user} />}
      {activeTab === tabs[1].key && <EditPassword />}
    </div>
  );
};
