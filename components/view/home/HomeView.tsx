import MainSection from "components/view/home/MainSection";
import HobbySection from "components/view/home/HobbySection";
import ThemeButton from "components/view/home/ThemeButton";

const HomeView = () => {
  return (
    <>
      <div className="text-black bg-white dark:bg-black dark:text-white">
        <MainSection />
        <HobbySection />
        <ThemeButton />
      </div>
    </>
  );
};

export default HomeView;
