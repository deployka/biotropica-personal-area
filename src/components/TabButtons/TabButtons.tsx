import React from 'react';

import classNames from 'classnames';

import s from './TabButtons.module.scss';

export interface Tab {
  key: string;
  value: string;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  onActiveTabChanged: (activeTab: string) => void;
  spaceBetween?: number;
}

const TabButtons = (props: Props) => {
  const {
    tabs,
    activeTab,
    onActiveTabChanged,
    spaceBetween,
  } = props;

  const handleClick = (tab: Tab) => {
    onActiveTabChanged(tab.key);
  };

  return (
    <div className={s.tabs} style={{ columnGap: spaceBetween || 40 }}>
      {tabs.map((tab: Tab) => (
        <div
          onClick={() => handleClick(tab)}
          key={tab.key}
          className={classNames(s.tab, {
            [s.active]: activeTab === tab.key,
          })}
        >
          <p>{tab.value}</p>
        </div>
      ))}
    </div>
  );
};

export default TabButtons;
