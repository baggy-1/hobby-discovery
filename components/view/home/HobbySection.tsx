import { css } from "@emotion/react";
import { section } from "components/view/home/styles";
import { useEffect, useRef } from "react";
import scrollAddFadeInUp from "util/scrollAddFadeInUp";

const HobbySection = () => {
  const refTextBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = refTextBox;
    if (current) {
      window.addEventListener("scroll", scrollAddFadeInUp(current));
    }
  }, []);

  return (
    <>
      <div css={section}>
        <div css={textBox} ref={refTextBox}>
          원하는 키트를 <br />
          구매할 수도 있어요
        </div>
      </div>
    </>
  );
};

export default HobbySection;

const textBox = css({
  padding: "4rem 2rem",
  fontWeight: "700",
  fontSize: "3rem",
  opacity: "0",
});
