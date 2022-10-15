interface Props {
  title: string;
  tabName: string;
  currentTab: string;
  onClickChangeTab: (tabName: string) => () => void;
}

const Tab = ({ title, tabName, currentTab, onClickChangeTab }: Props) => {
  const styles =
    tabName === "all" ? `border-l-0 rounded-tr-lg w-14` : `w-16  rounded-t-lg`;

  return (
    <div
      className={`${styles} flex items-center justify-center h-full border transition-none cursor-pointer ${
        currentTab === tabName ? "border-b-0 -translate-y-1" : "border-b-[1px]"
      }`}
      onClick={onClickChangeTab(tabName)}
    >
      {title}
    </div>
  );
};

export default Tab;
