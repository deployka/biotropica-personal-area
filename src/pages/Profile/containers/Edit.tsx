import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import s from './Profile.module.scss';

import EditProfile from './EditProfile';
import { Security } from './Security';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';
import { useCurrentUserQuery } from '../../../api/user';

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

  const { data: user } = useCurrentUserQuery();

  const { active } = useParams<Param>();
  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active, tabs)?.key || tabs[0].key,
  );

  return (
    <div className={s.edit__profile}>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onActiveTabChanged={setActiveTab}
      />
      {activeTab === tabs[0].key && user && <EditProfile />}
      {activeTab === tabs[1].key && user && <Security />}
    </div>
  );
};

export default Edit;
