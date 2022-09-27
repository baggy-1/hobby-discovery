import { useState } from "react";

const useTab = (defaultTab: string, tabList: string[]) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const onClickChangeTab = (tab: string) => {
    return () => {
      if (tabList.includes(tab)) {
        setCurrentTab(tab);
      }
      return;
    };
  };

  return { currentTab, setCurrentTab, onClickChangeTab };
};

export default useTab;
