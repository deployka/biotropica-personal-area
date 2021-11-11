import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import s from './Profile.module.scss';
import { selectUserData } from '../../../store/ducks/user/selectors';
import EditProfile from './EditProfile';
import { Security } from './Security';
import { getTabByKey, Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';

export interface Param {
  active: string;
}

const Edit = () => {
  const tabs: Tab[] = [
    {
      key: 'edit-profile',
      value: 'Личные данные',
    },
    {
      key: 'security',
      value: 'Безопасность',
    },
  ];

  const history = useHistory();
  const user = useSelector(selectUserData);

  const { active } = useParams<Param>();
  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active, tabs)?.key || tabs[0].key
  );
  useEffect(() => {
    history.push(`/profile/edit/${activeTab}`);
  }, [activeTab]);

  return (
    <div className={s.edit__profile}>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {active === tabs[0].key && user && <EditProfile />}
      {active === tabs[1].key && user && <Security />}
    </div>
  );
};

export default Edit;
