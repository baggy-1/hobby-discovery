import { css } from "@emotion/react";
import { mq } from "config/styles";

const HobbySection = () => {
  return (
    <>
      <div css={section}>
        <div css={wrapper}>
          <div css={textBox}>
            인테리어 소품부터 실제 사용 가능한 키트까지
            <br />
            다양한 키트를 받아보세요
          </div>
        </div>
      </div>
    </>
  );
};

export default HobbySection;

const textBox = css({
  padding: "5rem",
  fontWeight: "700",
  fontSize: "2.4rem",
  width: "100%",
  height: "auto",
  wordBreak: "keep-all",
  [mq[2]]: {
    padding: "2rem",
    fontSize: "1.8rem",
  },
});

const wrapper = css({
  width: "100%",
  maxWidth: "80rem",
});

const section = css({
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "center",
});
