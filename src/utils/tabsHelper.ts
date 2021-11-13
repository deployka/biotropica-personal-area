import { Tab } from '../shared/Global/Tabs/Tabs';

export function getTabByKey(key: string, tabs: Tab[]) {
  return tabs.find(tab => tab.key === key);
}
