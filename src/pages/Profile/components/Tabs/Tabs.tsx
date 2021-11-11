import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';

import s from './Tabs.module.scss';

export interface Tab {
  key: string;
  value: string;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export function getTabByKey(key: string, tabs: Tab[]) {
  return tabs.find(tab => tab.key === key);
}

export const Tabs = ({ tabs, activeTab, setActiveTab }: Props) => {
  function handleClick(tab: Tab) {
    setActiveTab(tab.key);
  }

  return (
    <div className={s.tabs}>
      {tabs.map((tab: Tab) => (
        <div
          onClick={() => handleClick(tab)}
          key={tab.key}
          className={classNames({
            [s.tab]: true,
            [s.active]: activeTab === tab.key,
          })}
        >
          {tab.value}
        </div>
      ))}
    </div>
  );
};
