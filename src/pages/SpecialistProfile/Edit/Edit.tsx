import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import s from './Edit.module.scss';
// import { selectUserData } from '../../../store/ducks/user/selectors';
import EditProfile from '../components/EditProfile/EditProfile';
import Safety from '../components/Safety/Safety';
import Courses from '../components/Courses/Courses';
import TabButtons, { Tab } from '../../../components/TabButtons/TabButtons';

export interface Param {
  active: string;
}

const Edit = () => {
  const tabs: Tab[] = [
    {
      key: 'profile',
      value: 'Личные данные',
    },
    {
      key: 'safety',
      value: 'Безопасность',
    },
    {
      key: 'courses',
      value: 'Ваши курсы',
    },
  ];

  const history = useHistory();
  const { path, url } = useRouteMatch();

  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  useEffect(() => {
    history.push(`${url}/${activeTab}`);
  }, [activeTab]);

  return (
    <div className={s.edit}>
      <TabButtons
        tabs={tabs}
        activeTab={activeTab}
        onActiveTabChanged={setActiveTab}
      />
      {activeTab === tabs[0].key && <EditProfile />}
      {activeTab === tabs[1].key && <Safety />}
      {activeTab === tabs[2].key && <Courses />}
    </div>
  );
};

export default Edit;
