import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { EditUserData } from './EditUserData';
import { EditSecurityData } from './EditSecurityData';
import { Tab, Tabs } from '../../../shared/Global/Tabs/Tabs';
import { getTabByKey } from '../../../utils/tabsHelper';
import { useCurrentUserQuery } from '../../../api/user';

import s from './Edit.module.scss';

export interface Param {
  active: string;
}

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

const Edit = () => {
  const history = useHistory();
  const { data: user } = useCurrentUserQuery();

  const { active } = useParams<Param>();
  const [activeTab, setActiveTab] = useState<string>(
    getTabByKey(active as string, tabs)?.key || tabs[0].key,
  );
  useEffect(() => {
    history.push(`/profile/edit/${activeTab}`);
  }, [activeTab]);

  return (
    <div className={s.edit}>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onActiveTabChanged={setActiveTab}
      />
      {active === tabs[0].key && user && <EditUserData />}
      {active === tabs[1].key && user && <EditSecurityData />}
    </div>
  );
};

export default Edit;
