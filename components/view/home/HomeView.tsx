import MainSection from "components/view/home/MainSection";
import HobbySection from "components/view/home/HobbySection";
import { css } from "@emotion/react";

const HomeView = () => {
  return (
    <>
      <div css={sectionWrapper}>
        <MainSection />
        <HobbySection />
      </div>
    </>
  );
};

export default HomeView;

const sectionWrapper = css({
  width: "100%",
  height: "100%",
});
