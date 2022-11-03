import { css } from "@emotion/react";
import MainSection from "components/view/subscription/MainSection";
import PrSection from "components/view/subscription/PrSection";

const SubscriptionView = () => {
  return (
    <>
      <div css={container} id={"subSection"}>
        <MainSection />
        <PrSection />
      </div>
    </>
  );
};

export default SubscriptionView;

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});
